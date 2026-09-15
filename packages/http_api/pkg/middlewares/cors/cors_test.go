package cors_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/abaldeweg/services/packages/http_api/pkg/middlewares/cors"
	"github.com/gin-gonic/gin"
)

func setupCORSRouter(allowOrigins, allowHeaders string) *gin.Engine {
	r := gin.New()
	r.Use(cors.CORS(allowOrigins, allowHeaders))
	r.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})
	return r
}

func TestCORSMiddleware_AllowedOrigin(t *testing.T) {
	r := setupCORSRouter("http://127.0.0.1, http://localhost", "")

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Origin", "http://localhost")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
	if origin := w.Header().Get("Access-Control-Allow-Origin"); origin != "http://localhost" {
		t.Fatalf("expected Access-Control-Allow-Origin to be 'http://localhost', got '%s'", origin)
	}
}

func TestCORSMiddleware_DisallowedOrigin(t *testing.T) {
	r := setupCORSRouter("http://127.0.0.1, http://localhost", "")

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Origin", "http://test.localhost")
	r.ServeHTTP(w, req)

	if origin := w.Header().Get("Access-Control-Allow-Origin"); origin != "" {
		t.Fatalf("expected no Access-Control-Allow-Origin for disallowed origin, got '%s'", origin)
	}
}

func TestCORSMiddleware_AllowAllOriginsWhenEmpty(t *testing.T) {
	r := setupCORSRouter("", "")

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Origin", "http://test.localhost")
	r.ServeHTTP(w, req)

	t.Logf("Headers: %+v", w.Header())
	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
	if origin := w.Header().Get("Access-Control-Allow-Origin"); origin != "*" {
		t.Fatalf("expected Access-Control-Allow-Origin to be '*', got '%s'", origin)
	}
}
