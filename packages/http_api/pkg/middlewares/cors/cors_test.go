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

func TestCORSMiddleware_OriginWithoutScheme(t *testing.T) {
	r := setupCORSRouter("localhost:3000, 127.0.0.1", "")

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Origin", "http://localhost:3000")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}
	if origin := w.Header().Get("Access-Control-Allow-Origin"); origin != "http://localhost:3000" {
		t.Fatalf("expected Access-Control-Allow-Origin to be 'http://localhost:3000', got '%s'", origin)
	}
}

func TestCORS_PreflightAndWildcard(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(cors.CORS("*", "Authorization, Content-Type"))

	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	t.Run("OPTIONS Preflight Request", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodOptions, "/test", nil)
		req.Header.Set("Origin", "http://localhost")
		req.Header.Set("Access-Control-Request-Method", "GET")
		req.Header.Set("Access-Control-Request-Headers", "Authorization")

		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		if w.Code != http.StatusNoContent && w.Code != http.StatusOK {
			t.Errorf("expected preflight status 204 or 200, got %d", w.Code)
		}

		if w.Header().Get("Access-Control-Allow-Origin") != "*" {
			t.Errorf("expected Allow-Origin '*', got %q", w.Header().Get("Access-Control-Allow-Origin"))
		}
	})

	t.Run("Standard GET Request with CORS headers", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/test", nil)
		req.Header.Set("Origin", "http://localhost")

		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		if w.Code != http.StatusOK {
			t.Errorf("expected status 200, got %d", w.Code)
		}
	})
}
