package docu_test

import (
	"net/http"
	"testing"

	"github.com/abaldeweg/services/packages/http_api/pkg/docu"
	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func TestNewRouter(t *testing.T) {
	tests := []struct {
		name string
		mode string
	}{
		{
			name: "debug mode",
			mode: gin.DebugMode,
		},
		{
			name: "release mode",
			mode: gin.ReleaseMode,
		},
		{
			name: "test mode",
			mode: gin.TestMode,
		},
		{
			name: "empty mode",
			mode: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := docu.NewRouter(tt.mode)
			if d == nil {
				t.Fatal("expected NewRouter to return a non-nil Docu instance")
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
			name:     "debug mode returns message",
			mode:     gin.DebugMode,
			port:     8080,
			expected: "Swagger-Docs available at http://127.0.0.1:8080/swagger/index.html",
		},
		{
			name:     "empty mode returns message",
			mode:     "",
			port:     3000,
			expected: "Swagger-Docs available at http://127.0.0.1:3000/swagger/index.html",
		},
		{
			name:     "release mode returns empty string",
			mode:     gin.ReleaseMode,
			port:     8080,
			expected: "",
		},
		{
			name:     "test mode returns empty string",
			mode:     gin.TestMode,
			port:     8080,
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			d := docu.NewRouter(tt.mode)
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
			name:          "debug mode registers swagger route",
			mode:          gin.DebugMode,
			routeExpected: true,
		},
		{
			name:          "empty mode registers swagger route",
			mode:          "",
			routeExpected: true,
		},
		{
			name:          "release mode does not register swagger route",
			mode:          gin.ReleaseMode,
			routeExpected: false,
		},
		{
			name:          "test mode does not register swagger route",
			mode:          gin.TestMode,
			routeExpected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			router := gin.New()
			d := docu.NewRouter(tt.mode)
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
