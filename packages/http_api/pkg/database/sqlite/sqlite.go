package sqlite

import (
	"cmp"
	"context"
	"database/sql"
	"fmt"
	"io/fs"
	"slices"

	"github.com/abaldeweg/services/packages/http_api/pkg/database/migration"

	_ "modernc.org/sqlite"
)

// DB struct holds the configuration and internal state for the SQLite database connection.
type DB struct {
	URI    string
	Client *sql.DB
}

// NewSQLite initializes a new SQLite database instance with URI.
func NewSQLite(uri string) *DB {
	return &DB{
		URI:    uri,
		Client: nil,
	}
}

// Connect establishes the connection to the SQLite database.
func (db *DB) Connect(ctx context.Context) error {
	if db.Client != nil {
		return fmt.Errorf("sqlite: connection already established")
	}

	conn, err := sql.Open("sqlite", db.URI)
	if err != nil {
		return fmt.Errorf("sqlite open failed: %w", err)
	}

	if err := conn.PingContext(ctx); err != nil {
		_ = conn.Close()
		return fmt.Errorf("sqlite ping failed: %w", err)
	}

	db.Client = conn

	return nil
}

// ConnectAndMigrate establishes the connection to the SQLite database
// and applies any pending migrations.
func (db *DB) ConnectAndMigrate(SQLiteMigrations fs.FS) error {
	ctx := context.Background()
	if err := db.Connect(ctx); err != nil {
		return fmt.Errorf("database connection failed: %w", err)
	}
	if err := db.Migrate(ctx, SQLiteMigrations); err != nil {
		return fmt.Errorf("database migration failed: %w", err)
	}
	return nil
}

// Close closes the database connection.
func (db *DB) Close() error {
	if db.Client != nil {
		err := db.Client.Close()
		db.Client = nil
		return err
	}
	return nil
}

// Migrate applies the migrations loaded from the provided filesystem that have not yet been applied.
func (db *DB) Migrate(ctx context.Context, fsys fs.FS) error {
	if db.Client == nil {
		return fmt.Errorf("sqlite client is not connected")
	}

	migrations, err := migration.Load(fsys, ".sql")
	if err != nil {
		return fmt.Errorf("failed to load migrations: %w", err)
	}

	if len(migrations) == 0 {
		return nil
	}

	if !slices.IsSortedFunc(migrations, func(a, b migration.Migration) int {
		return cmp.Compare(a.Version, b.Version)
	}) {
		return fmt.Errorf("migrations must be sorted by version ascending")
	}

	if err := db.ensureMigrationsTable(ctx); err != nil {
		return fmt.Errorf("sqlite migrations table setup failed: %w", err)
	}

	applied, err := db.appliedMigrations(ctx)
	if err != nil {
		return fmt.Errorf("sqlite applied migrations lookup failed: %w", err)
	}

	pending := filterPending(migrations, applied)

	for _, m := range pending {
		if err := db.applyMigration(ctx, m); err != nil {
			return fmt.Errorf("sqlite migration %d failed: %w", m.Version, err)
		}
	}

	return nil
}

// filterPending returns the subset of migrations whose Version is not yet present in applied.
func filterPending(migrations []migration.Migration, applied map[int64]bool) []migration.Migration {
	pending := make([]migration.Migration, 0, len(migrations))
	for _, m := range migrations {
		if !applied[m.Version] {
			pending = append(pending, m)
		}
	}
	return pending
}

// ensureMigrationsTable creates the schema_migrations table if it does not already exist.
func (db *DB) ensureMigrationsTable(ctx context.Context) error {
	const stmt = `CREATE TABLE IF NOT EXISTS schema_migrations (
	version    INTEGER PRIMARY KEY,
	applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`

	_, err := db.Client.ExecContext(ctx, stmt)
	return err
}

// appliedMigrations returns the set of migration versions already recorded in schema_migrations.
func (db *DB) appliedMigrations(ctx context.Context) (map[int64]bool, error) {
	rows, err := db.Client.QueryContext(ctx, "SELECT version FROM schema_migrations")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	applied := make(map[int64]bool)
	for rows.Next() {
		var version int64
		if err := rows.Scan(&version); err != nil {
			return nil, err
		}
		applied[version] = true
	}

	return applied, rows.Err()
}

// applyMigration runs a single migration's statements and records it in
// schema_migrations. On any failure the transaction is rolled back.
func (db *DB) applyMigration(ctx context.Context, m migration.Migration) error {
	tx, err := db.Client.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin transaction failed: %w", err)
	}
	defer func() {
		_ = tx.Rollback()
	}()

	if _, err := tx.ExecContext(ctx, m.Script); err != nil {
		return fmt.Errorf("statement execution failed: %w", err)
	}

	if _, err := tx.ExecContext(ctx, "INSERT INTO schema_migrations (version) VALUES (?)", m.Version); err != nil {
		return fmt.Errorf("recording migration failed: %w", err)
	}

	return tx.Commit()
}
