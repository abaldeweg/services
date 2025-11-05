package HttpApi

import (
	"net/http"
	"os"
	"slices"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
	env_name_mode              = "MODE"
	env_name_port              = "PORT"
	env_name_cors_allow_origin = "CORS_ALLOW_ORIGIN"
)

// HttpApiInterface defines the public methods for HttpApi.
type HttpApiInterface interface {
	Run() error

	Request(method, path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Controller(path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Get(path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Post(path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Delete(path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Patch(path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Put(path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Options(path string, handlers ...gin.HandlerFunc) gin.IRoutes
	Head(path string, handlers ...gin.HandlerFunc) gin.IRoutes
}

// HttpApi wraps a gin.Engine and manages the server port.
type HttpApi struct {
	engine *gin.Engine
	port   string
}

// SetEnvMode sets the environment variable name for env_name_mode.
func SetEnvMode(name string) {
	env_name_mode = name
}

// SetEnvPort sets the environment variable name for env_name_port.
func SetEnvPort(name string) {
	env_name_port = name
}

// SetEnvCorsAllowOrigin sets the environment variable name for env_name_cors_allow_origin.
func SetEnvCorsAllowOrigin(name string) {
	env_name_cors_allow_origin = name
}

// NewHttpApi creates a new HttpApi with engine.
func NewHttpApi() HttpApiInterface {
	setMode()
	r := &HttpApi{
		engine: gin.Default(),
		port:   os.Getenv(env_name_port),
	}
	r.engine.Use(r.corsHeaders())
	return r
}

// Run starts the HTTP server.
func (r *HttpApi) Run() error {
	return r.engine.Run(":" + r.port)
}

// Handle registers a new route with the given method.
func (r *HttpApi) Request(method, path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.engine.Handle(method, path, handlers...)
}

// Controller creates a new route group with the given relative path and handlers.
func (r *HttpApi) Controller(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.engine.Group(path, handlers...)
}

// Get registers a new GET route.
func (r *HttpApi) Get(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodGet, path, handlers...)
}

// Post registers a new POST route.
func (r *HttpApi) Post(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodPost, path, handlers...)
}

// Delete registers a new DELETE route.
func (r *HttpApi) Delete(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodDelete, path, handlers...)
}

// Patch registers a new PATCH route.
func (r *HttpApi) Patch(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodPatch, path, handlers...)
}

// Put registers a new PUT route.
func (r *HttpApi) Put(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodPut, path, handlers...)
}

// Options registers a new OPTIONS route.
func (r *HttpApi) Options(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodOptions, path, handlers...)
}

// Head registers a new HEAD route.
func (r *HttpApi) Head(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodHead, path, handlers...)
}

// setMode sets the Gin mode based on the MODE environment variable.
func setMode() {
	modes := []string{"release", "debug", "test"}
	mode := os.Getenv(env_name_mode)
	if slices.Contains(modes, mode) {
		gin.SetMode(mode)
	}
}

// corsHeaders returns the location middleware with default configuration.
func (r *HttpApi) corsHeaders() gin.HandlerFunc {
	config := cors.DefaultConfig()
	config.AddAllowHeaders("Authorization")

	if allowOrigin, exists := os.LookupEnv(env_name_cors_allow_origin); exists {
		config.AllowOrigins = strings.Split(allowOrigin, ",")
	} else {
		config.AllowOrigins = []string{"http://localhost"}
	}

	return cors.New(config)
}
