package sqlite_test

import (
	"context"
	"path/filepath"
	"testing"
	"testing/fstest"

	"github.com/abaldeweg/services/packages/http_api/pkg/database/sqlite"
)

func TestSQLite_Connect(t *testing.T) {
	tmpDir := t.TempDir()
	dbPath := filepath.Join(tmpDir, "test.db")

	db := sqlite.NewSQLite("file:" + dbPath)
	ctx := context.Background()

	if err := db.Connect(ctx); err != nil {
		t.Fatalf("failed to connect: %v", err)
	}
	defer func() {
		_ = db.Close()
	}()

	if db.Client == nil {
		t.Fatal("expected Client to be initialized")
	}

	if err := db.Client.PingContext(ctx); err != nil {
		t.Fatalf("failed to ping connected database: %v", err)
	}
}

func TestSQLite_Connect_AlreadyConnected(t *testing.T) {
	tmpDir := t.TempDir()
	dbPath := filepath.Join(tmpDir, "test.db")

	db := sqlite.NewSQLite("file:" + dbPath)
	ctx := context.Background()

	if err := db.Connect(ctx); err != nil {
		t.Fatalf("failed to connect: %v", err)
	}
	defer func() {
		_ = db.Close()
	}()

	if err := db.Connect(ctx); err == nil {
		t.Fatal("expected error when calling Connect on an already established connection")
	}
}

func TestSQLite_Migrate(t *testing.T) {
	tmpDir := t.TempDir()
	dbPath := filepath.Join(tmpDir, "test.db")

	db := sqlite.NewSQLite("file:" + dbPath)
	ctx := context.Background()

	if err := db.Connect(ctx); err != nil {
		t.Fatalf("failed to connect: %v", err)
	}
	defer func() {
		_ = db.Close()
	}()

	mockFS := fstest.MapFS{
		"1.sql": &fstest.MapFile{
			Data: []byte("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);"),
		},
		"2.sql": &fstest.MapFile{
			Data: []byte("INSERT INTO users (name) VALUES ('Jane');"),
		},
	}

	if err := db.Migrate(ctx, mockFS); err != nil {
		t.Fatalf("migration failed: %v", err)
	}

	if err := db.Migrate(ctx, mockFS); err != nil {
		t.Fatalf("second migration run failed: %v", err)
	}

	var name string
	if err := db.Client.QueryRowContext(ctx, "SELECT name FROM users WHERE id = 1").Scan(&name); err != nil {
		t.Fatalf("failed to query migrated data: %v", err)
	}
	if name != "Jane" {
		t.Fatalf("expected Jane, got %q", name)
	}
}
