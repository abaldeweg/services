package doc_test

import (
	"net/http"
	"testing"

	"github.com/abaldeweg/services/packages/http_api/pkg/doc"
	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func TestNewDoc(t *testing.T) {
	tests := []struct {
		name string
		mode string
	}{
		{
			name: "debug mode",
			mode: "dev",
		},
		{
			name: "release mode",
			mode: "prod",
		},
		{
			name: "test mode",
			mode: "test",
		},
		{
			name: "empty mode",
			mode: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := doc.NewDoc(tt.mode)
			if d == nil {
				t.Fatal("expected NewDoc to return a non-nil Doc instance")
			}
			if d.Mode != tt.mode {
				t.Errorf("expected Mode %q, got %q", tt.mode, d.Mode)
			}
		})
	}
}

func TestGenerateCLIMessage(t *testing.T) {
	tests := []struct {
		name     string
		mode     string
		port     int
		expected string
	}{
		{
			name:     "dev mode returns message",
			mode:     "dev",
			port:     8080,
			expected: "Swagger-Docs available at http://127.0.0.1:8080/swagger/index.html",
		},
		{
			name:     "empty mode returns empty string",
			mode:     "",
			port:     3000,
			expected: "Swagger-Docs available at http://127.0.0.1:3000/swagger/index.html",
		},
		{
			name:     "prod mode returns empty string",
			mode:     "prod",
			port:     8080,
			expected: "",
		},
		{
			name:     "test mode returns empty string",
			mode:     "test",
			port:     8080,
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := doc.NewDoc(tt.mode)
			got := d.GenerateCLIMessage(tt.port)
			if got != tt.expected {
				t.Errorf("expected %q, got %q", tt.expected, got)
			}
		})
	}
}

func TestRegisterRoutes(t *testing.T) {
	tests := []struct {
		name          string
		mode          string
		routeExpected bool
	}{
		{
			name:          "dev mode registers swagger route",
			mode:          "dev",
			routeExpected: true,
		},
		{
			name:          "empty mode registers swagger route",
			mode:          "",
			routeExpected: true,
		},
		{
			name:          "prod mode does not register swagger route",
			mode:          "prod",
			routeExpected: false,
		},
		{
			name:          "test mode does not register swagger route",
			mode:          "test",
			routeExpected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			router := gin.New()
			d := doc.NewDoc(tt.mode)
			d.RegisterRoutes(router)

			hasRoute := false
			for _, r := range router.Routes() {
				if r.Path == "/swagger/*any" && r.Method == http.MethodGet {
					hasRoute = true
					break
				}
			}

			if hasRoute != tt.routeExpected {
				t.Errorf("expected route registration to be %v, got %v", tt.routeExpected, hasRoute)
			}
		})
	}
}
