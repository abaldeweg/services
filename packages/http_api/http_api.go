package http_api

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

// RouterInterface defines the public methods for Router.
type RouterInterface interface {
	Run() error
	SetPort(port int)

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

// Router wraps a gin.Engine and manages the server port.
type Router struct {
	engine *gin.Engine
	port   int
}

// NewRouter creates a new Router with engine.
func NewRouter() RouterInterface {
	mode := os.Getenv("MODE")
	if mode == "" {
		mode = gin.DebugMode
	}
	gin.SetMode(mode)
	r := &Router{
		engine: gin.Default(),
		port:   8080,
	}
	viper.SetDefault("CORS_ALLOW_ORIGIN", "http://127.0.0.1")
	r.engine.Use(corsHeaders())
	loadConfig()
	return r
}

// Run starts the HTTP server.
func (r *Router) Run() error {
	return r.engine.Run(":" + strconv.Itoa(r.port))
}

// SetPort sets the port for the HTTP server.
func (r *Router) SetPort(port int) {
	if port <= 0 {
		port = r.port
	}
	r.port = port
}

// Handle registers a new route with the given method.
func (r *Router) Request(method, path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.engine.Handle(method, path, handlers...)
}

// Controller creates a new route group with the given relative path and handlers.
func (r *Router) Controller(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.engine.Group(path, handlers...)
}

// Get registers a new GET route.
func (r *Router) Get(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodGet, path, handlers...)
}

// Post registers a new POST route.
func (r *Router) Post(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodPost, path, handlers...)
}

// Delete registers a new DELETE route.
func (r *Router) Delete(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodDelete, path, handlers...)
}

// Patch registers a new PATCH route.
func (r *Router) Patch(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodPatch, path, handlers...)
}

// Put registers a new PUT route.
func (r *Router) Put(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodPut, path, handlers...)
}

// Options registers a new OPTIONS route.
func (r *Router) Options(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodOptions, path, handlers...)
}

// Head registers a new HEAD route.
func (r *Router) Head(path string, handlers ...gin.HandlerFunc) gin.IRoutes {
	return r.Request(http.MethodHead, path, handlers...)
}

// corsHeaders returns the location middleware with default configuration.
func corsHeaders() gin.HandlerFunc {
	config := cors.DefaultConfig()
	config.AddAllowHeaders("Authorization")

	allowOrigin := "*"
	if viper.IsSet("CORS_ALLOW_ORIGIN") {
		allowOrigin = viper.GetString("CORS_ALLOW_ORIGIN")
	}
	config.AllowOrigins = strings.Split(allowOrigin, ",")

	return cors.New(config)
}

// loadConfig loads the application configuration.
func loadConfig() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("config/")

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			fmt.Println("The Config file was not found, using defaults.")
		} else {
			log.Fatalf("Error loading config file: %s", err)
		}
	}
}
