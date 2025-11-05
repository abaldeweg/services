package HttpApi

import (
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestNewHttpApiReturnsInterface(t *testing.T) {
	api := NewHttpApi()
	if api == nil {
		t.Fatalf("NewHttpApi returned nil")
	}

	httpApi, ok := api.(*HttpApi)
	if !ok {
		t.Fatalf("expected *HttpApi concrete type, got %T", api)
	}

	if httpApi.engine == nil {
		t.Fatalf("engine is nil on returned HttpApi")
	}

	if httpApi.port != "" {
		t.Fatalf("unexpected port is returned by HttpApi, expected '', got '%s'", httpApi.port)
	}

	r := api.Get("/test", func(c *gin.Context) { c.String(http.StatusOK, "test") })
	if r == nil {
		t.Fatalf("Registering GET route returned nil")
	}
}
