package server_test

import (
	"context"
	"testing"
	"time"

	"github.com/abaldeweg/services/packages/http_api/pkg/server"
	"github.com/gin-gonic/gin"
)

func TestNewServer(t *testing.T) {
	t.Run("valid configuration", func(t *testing.T) {
		s, err := server.NewServer(8080, gin.TestMode)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if s == nil {
			t.Fatal("expected server instance, got nil")
		}
		if s.HTTPServer.Addr != ":8080" {
			t.Errorf("expected addr %q, got %q", ":8080", s.HTTPServer.Addr)
		}
	})

	t.Run("invalid port", func(t *testing.T) {
		_, err := server.NewServer(0, gin.TestMode)
		if err == nil {
			t.Fatal("expected error for port 0, got nil")
		}

		_, err = server.NewServer(70000, gin.TestMode)
		if err == nil {
			t.Fatal("expected error for port > 65535, got nil")
		}
	})
}

func TestServer_AddMessage(t *testing.T) {
	s, err := server.NewServer(8080, gin.TestMode)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	initialLen := len(s.Messages)
	s.AddMessage("Test message")
	if len(s.Messages) != initialLen+1 {
		t.Errorf("expected %d messages, got %d", initialLen+1, len(s.Messages))
	}

	s.AddMessage("")
	if len(s.Messages) != initialLen+1 {
		t.Errorf("expected empty message to not be added, got %d messages", len(s.Messages))
	}
}

func TestServer_RunWithContext(t *testing.T) {
	s, err := server.NewServer(8091, gin.TestMode) // Fester Test-Port statt 0, um Bindungsfehler zu vermeiden
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	s.AddMessage("Test Startup Message")

	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	err = s.RunWithContext(ctx)
	// Ein durch den Context ausgelöster Deadline-Fehler ist beim Shutdown gewollt und kein Testfehler
	if err != nil && err.Error() != "server error: context deadline exceeded" {
		t.Fatalf("unexpected server run error: %v", err)
	}
}
