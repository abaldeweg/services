package mdb

import (
	"context"
	"fmt"
	"net/url"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// DB encapsulates the MongoDB client and database connection.
type DB struct {
	URI    string
	Client *mongo.Client
	MDB    *mongo.Database
}

// NewMDB creates a new instance of the MDB wrapper. uri must include the
// target database as its path component, e.g. "mongodb://host:27017/dbname".
func NewMDB(uri string) *DB {
	return &DB{
		URI: uri,
	}
}

// Connect parses the database name from the URI, establishes the
// connection, and verifies reachability via Ping.
func (db *DB) Connect(ctx context.Context) error {
	if db.Client != nil {
		return fmt.Errorf("mdb: connection already established")
	}

	database, err := databaseFromURI(db.URI)
	if err != nil {
		return fmt.Errorf("mdb: %w", err)
	}

	clientOpts := options.Client().ApplyURI(db.URI)

	client, err := mongo.Connect(clientOpts)
	if err != nil {
		return fmt.Errorf("mdb: connect failed: %w", err)
	}

	if err := client.Ping(ctx, nil); err != nil {
		disconnectCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		_ = client.Disconnect(disconnectCtx)
		return fmt.Errorf("mdb: ping failed: %w", err)
	}

	db.Client = client
	db.MDB = client.Database(database)

	return nil
}

// Close disconnects from the MongoDB cluster and cleans up internal state.
func (db *DB) Close(ctx context.Context) error {
	client := db.Client
	if client == nil {
		return nil
	}

	db.Client = nil
	db.MDB = nil

	closeCtx := ctx
	if ctx.Err() != nil {
		var cancel context.CancelFunc
		closeCtx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
	}

	if err := client.Disconnect(closeCtx); err != nil {
		return fmt.Errorf("mdb: disconnect failed: %w", err)
	}

	return nil
}

// databaseFromURI extracts the database name from uri's path component.
func databaseFromURI(uri string) (string, error) {
	u, err := url.Parse(uri)
	if err != nil {
		return "", fmt.Errorf("invalid uri: %w", err)
	}

	name := strings.TrimPrefix(u.Path, "/")
	if name == "" {
		return "", fmt.Errorf("connection string must specify a database name")
	}

	return name, nil
}
