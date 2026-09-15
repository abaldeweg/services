package mdb

import (
	"context"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
)

func TestNewMDB(t *testing.T) {
	uri := "mongodb://localhost:27017/testdb"
	db := NewMDB(uri)

	if db == nil {
		t.Fatal("expected NewMDB to return a non-nil DB instance")
	}
	if db.URI != uri {
		t.Errorf("expected URI %q, got %q", uri, db.URI)
	}
	if db.Client != nil {
		t.Error("expected Client to be nil upon initialization")
	}
	if db.MDB != nil {
		t.Error("expected MDB to be nil upon initialization")
	}
}

func TestConnect_InvalidURI(t *testing.T) {
	ctx := context.Background()
	db := NewMDB("invalid")

	err := db.Connect(ctx)
	if err == nil {
		t.Error("expected error for invalid URI, got nil")
	}
}

func TestConnect_MissingDatabaseName(t *testing.T) {
	ctx := context.Background()
	db := NewMDB("mongodb://localhost:27017")

	err := db.Connect(ctx)
	if err == nil {
		t.Error("expected error when database name is omitted from URI, got nil")
	}
}

func TestConnect_AlreadyConnected(t *testing.T) {
	ctx := context.Background()
	db := NewMDB("mongodb://localhost:27017/testdb")

	db.Client = &mongo.Client{}

	err := db.Connect(ctx)
	if err == nil {
		t.Error("expected error when calling Connect on an already established connection")
	}
}

func TestConnect_PingFailure(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
	defer cancel()

	db := NewMDB("mongodb://127.0.0.1:27017/testdb")

	err := db.Connect(ctx)
	if err == nil {
		t.Error("expected ping failure error for unreachable MongoDB host, got nil")
	}

	if db.Client != nil {
		t.Error("expected db.Client to be nil after ping failure")
	}
	if db.MDB != nil {
		t.Error("expected db.MDB to be nil after ping failure")
	}
}

func TestClose_NotConnected(t *testing.T) {
	ctx := context.Background()
	db := NewMDB("mongodb://127.0.0.1:27017/testdb")

	err := db.Close(ctx)
	if err != nil {
		t.Errorf("expected Close() on unconnected DB to return nil, got: %v", err)
	}
}
