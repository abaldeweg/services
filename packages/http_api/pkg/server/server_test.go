package server_test

import (
	"testing"

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
		if s.Mode != gin.TestMode {
			t.Errorf("expected mode %q, got %q", gin.TestMode, s.Mode)
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
