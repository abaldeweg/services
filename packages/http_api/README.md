# http_api

http_api offers a simple abstraction around existing tools to run an HTTP API server, with router and CORS.

## Structure

Always set `MODE=release` in production environments for best performance and security.

You can set the Gin mode ("release", "debug", "test") via the environment variable `MODE`. If not set, it defaults to `debug`.

### Swagger

For using the swagger documentation, install the module `go install github.com/swaggo/swag/cmd/swag@latest` and then run `swag init -o ./internal/docs` in your project root to generate the Swagger docs.

### main.go (Example)

```go
package main

import (
 "log"

 "github.com/abaldeweg/services/packages/api/internal/app"
)

// main function initializes the application and starts the server.
//
// @title           API
// @version         1.0
// @description     HTTP API Service.

// @host            127.0.0.1:8080
// @BasePath        /api/v1
func main() {
 a, err := app.NewApp()
 if err != nil {
  log.Fatalf("Error initializing application: %v", err)
 }
 if err := a.Run(); err != nil {
  log.Fatalf("Failed to start server: %v", err)
 }
}
```

### app/app.go (Example)

```go
// app/app.go
package app

import (
 "embed"
 "fmt"
 "log"

 _ "github.com/abaldeweg/services/packages/api/docs"
 "github.com/abaldeweg/services/packages/api/internal/handlers"
 "github.com/abaldeweg/services/packages/api/internal/repositories"
 _ "github.com/abaldeweg/services/packages/api/internal/validators"
 "github.com/abaldeweg/services/packages/http_api/pkg/config"
 "github.com/abaldeweg/services/packages/http_api/pkg/database/sqlite"
 "github.com/abaldeweg/services/packages/http_api/pkg/docu"
 "github.com/abaldeweg/services/packages/http_api/pkg/server"
 "github.com/abaldeweg/services/packages/http_api/pkg/validation"
 "github.com/spf13/viper"
)

// App struct holds the application's handlers, configuration,
// database connection, and HTTP router.
type App struct {
 Config *viper.Viper
 DB     *sqlite.DB
 Server *server.Server
 Docu   *docu.Docu
}

//go:embed migrations
var SQLiteMigrations embed.FS

// NewApp initializes the application.
func NewApp() (*App, error) {
 a := &App{}

 // Config
 cfg := config.NewConfig()
 cfg.LoadEnv()
 a.Config = cfg.Viper

 // Docu
 a.Docu = docu.NewRouter(a.Config.GetString("GIN_MODE"))

 // DB
 a.DB = sqlite.NewSQLite("file:app.db")
 if err := a.DB.ConnectAndMigrate(SQLiteMigrations); err != nil {
  return nil, err
 }

 // Server
 srv, err := server.NewServer(8080, a.Config.GetString("GIN_MODE"))
 if err != nil {
  _ = a.DB.Close()
  return nil, fmt.Errorf("failed to initialize server: %w", err)
 }
 srv.SetCORS(
  a.Config.GetString("CORS_ALLOW_ORIGIN"),
  a.Config.GetString("CORS_ALLOW_HEADERS"),
 )
 srv.AddMessage(a.Docu.GenerateCLIMessage(8080))
 a.Server = srv

 // Validators
 v, err := validation.NewValidator()
 if err != nil {
  _ = a.DB.Close()
  return nil, fmt.Errorf("failed to create validator: %w", err)
 }
 if err := v.RegisterValidators(); err != nil {
  _ = a.DB.Close()
  return nil, fmt.Errorf("failed to register validators: %w", err)
 }

 // Router
 a.loadRoutes()

 return a, nil
}

// Run starts the HTTP server.
func (a *App) Run() error {
 defer func() {
  if a.DB != nil {
   if err := a.DB.Close(); err != nil {
    log.Printf("Error closing database: %v", err)
   }
  }
 }()

 return a.Server.Run()
}

// loadRoutes sets up the application's routes for the documentation and book handler.
func (a *App) loadRoutes() {
 // Initialize repositories
 bookRepo := repositories.NewBookRepository(a.DB.Client)

 // Initialize handlers
 bookHandler := handlers.NewBookHandler(bookRepo)

 // Register routes
 a.Docu.RegisterRoutes(a.Server.Router)
 bookHandler.RegisterRoutes(a.Server.Router)
}
```

### Handler (Example)

```go
package handlers

import (
 "context"
 "net/http"

 "github.com/abaldeweg/services/packages/api/internal/models"
 "github.com/gin-gonic/gin"
)

type BookRepository interface {
 FindAll(ctx context.Context) ([]models.Book, error)
}

type BookHandler struct {
 repo BookRepository
}

// NewBookHandler creates a new instance of BookHandler with the provided BookRepository.
func NewBookHandler(repo BookRepository) *BookHandler {
 return &BookHandler{
  repo: repo,
 }
}

func (handler *BookHandler) RegisterRoutes(router *gin.Engine) {
 books := router.Group("/api/v1/books")
 {
  books.GET("", handler.GetBooks)
 }
}

// GetBooks handles the HTTP GET request to retrieve all books from the repository and returns them in JSON format.
//
// GetBooks godoc
// @Summary      Fetch a list of books
// @Description  Returns a list of all books
// @Tags         books
// @Produce      json
// @Success      200  {array}  models.Book
// @Failure      500  {object} map[string]string
// @Router       /books [get]
func (handler *BookHandler) GetBooks(c *gin.Context) {
 books, err := handler.repo.FindAll(c.Request.Context())
 if err != nil {
  c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load books."})
  return
 }

 c.JSON(http.StatusOK, gin.H{"data": books})
}
```

### Model (Example)

```go
package models

import (
 "time"
)

type Book struct {
 ID          string    `json:"id"`
 Title       string    `json:"title"`
 Author      string    `json:"author"`
 PublishedAt time.Time `json:"published_at"`
 CreatedAt   time.Time `json:"created_at"`
}

type BookRequest struct {
 Title       string    `json:"title" binding:"required,min=1,max=255"`
 Author      string    `json:"author" binding:"required,max=255,example"`
 PublishedAt time.Time `json:"published_at" binding:"required"`
}

type BookResponse struct {
 ID          string    `json:"id"`
 Title       string    `json:"title"`
 Author      string    `json:"author"`
 PublishedAt time.Time `json:"published_at"`
 CreatedAt   time.Time `json:"created_at"`
}
```

### Repository (Example)

```go
package repositories

import (
 "context"
 "database/sql"

 "github.com/abaldeweg/services/packages/api/internal/models"
)

type BookRepository struct {
 db *sql.DB
}

// NewBookRepository creates a new instance of BookRepository with the provided database connection.
func NewBookRepository(db *sql.DB) *BookRepository {
 return &BookRepository{
  db: db,
 }
}

// FindAll retrieves all books from the database.
func (r *BookRepository) FindAll(ctx context.Context) ([]models.Book, error) {
 query := `SELECT id, title, author, published_at, created_at FROM books`
 rows, err := r.db.QueryContext(ctx, query)
 if err != nil {
  return nil, err
 }
 defer rows.Close()

 books := make([]models.Book, 0)
 for rows.Next() {
  var b models.Book
  if err := rows.Scan(&b.ID, &b.Title, &b.Author, &b.PublishedAt, &b.CreatedAt); err != nil {
   return nil, err
  }
  books = append(books, b)
 }

 if err = rows.Err(); err != nil {
  return nil, err
 }
 return books, nil
}
```

## Config

Config is using [Viper](https://pkg.go.dev/github.com/spf13/viper).

The file must have a supported file extension.

```go
// Create a new instance
config := config.NewConfig()

// Optionally, load config file, e.g., ".env", "config.yaml"
config.SetConfigFile(".env")

// Optionally, use environment variables
config.LoadEnv()

// Read the configuration files
// This is only required if a config file is set.
if err := config.ReadConfig(); err != nil {
  return nil, fmt.Errorf("failed to read config: %w", err)
 }
```

## Database

### SQLite

```go
import "github.com/abaldeweg/services/packages/http_api/pkg/database/sqlite"

db := sqlite.NewSQLite("file:app.db")

ctx := context.Background()
if err := db.Connect(ctx); err != nil {
  return nil, fmt.Errorf("database connection failed: %w", err)
}

// Optionally, run database migrations
if err := db.Migrate(ctx, SQLiteMigrations); err != nil {
  return nil, fmt.Errorf("database migration failed: %w", err)
}
```

This can also be written as:

```go
import "github.com/abaldeweg/services/packages/http_api/pkg/database/sqlite"

db := sqlite.NewSQLite("file:app.db")

a.DB = sqlite.NewSQLite("file:app.db")
 if err := a.DB.ConnectAndMigrate(SQLiteMigrations); err != nil {
  return nil, err
 }
```

Migrations must be located in a dir named "migrations".

### MongoDB

```go
import "github.com/abaldeweg/services/packages/http_api/pkg/database/mdb"

db := mdb.NewMDB("mongodb://localhost:27017/my_database")

ctx := context.Background()
if err := db.Connect(ctx); err != nil {
  return nil, fmt.Errorf("database connection failed: %w", err)
}
```

## Docu

```go
import "github.com/abaldeweg/services/packages/http_api/pkg/doc"

d := doc.NewDoc(gin.DebugMode)

// Register the routes for the Swagger documentation
d.RegisterRoutes(router)

// Generate the CLI message for accessing the Swagger documentation
d.GenerateCLIMessage(8080)
```

## Server

```go
import (
    "log"

    "github.com/abaldeweg/services/packages/http_api/pkg/server"
)

s := server.NewServer(8080, handler)
    if err := s.Run(); err != nil {
    log.Fatalf("Failed to start server: %v", err)
 }

// Optionally, add a message to be displayed when the server starts.
s.AddMessage("Server is starting...\n")
```

## Validation

Create a new validator instance and register custom validators.

```go
import "github.com/abaldeweg/services/packages/http_api/pkg/validation"

v, err := validation.NewValidator()
if err != nil {
 _ = a.DB.Close()
 return nil, fmt.Errorf("failed to create validator: %w", err)
}
if err := v.RegisterValidators(); err != nil {
 _ = a.DB.Close()
 return nil, fmt.Errorf("failed to register validators: %w", err)
}
```

Create a new validator in a dedicated validators package. The package name can be defined individually based on the project structure.

```go
package validators

import (
 "github.com/abaldeweg/services/packages/http_api/pkg/validation"
 "github.com/go-playground/validator/v10"
)

// validateExample validates whether the content is non-empty.
func validateExample(fl validator.FieldLevel) bool {
 content := fl.Field().String()
 return len(content) > 0
}

// init registers the example validator.
func init() {
 validation.AddValidator("example", validateExample)
}
```

Import this validators package in the application to ensure the custom validators are registered.

```go
import _ "github.com/abaldeweg/services/packages/api/internal/validators"
```

## Middlewares

### CORS

```go
import (
    "github.com/abaldeweg/services/packages/http_api/pkg/middlewares/cors"
    "github.com/gin-gonic/gin"
)

r := gin.Default()

// Pass allowed origins and allowed headers as comma-separated strings.
// An empty origin string allows all origins ("*").
r.Use(cors.CORS("http://localhost:3000, https://localhost", "Authorization, Content-Type"))
```
