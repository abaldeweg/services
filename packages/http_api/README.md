# http_api

http_api offers a simple abstraction for existing tools to run an HTTP API server, with router, CORS and configuration management.

## Usage

Always set `MODE=release` in production environments for best performance and security.

You can set the Gin mode ("release", "debug", "test") via the environment variable `MODE`. If not set, it defaults to `debug`.

A config is read from `config/config.yaml` if it exists.

```go
package main

import (
    "log"

    "github.com/abaldeweg/services/http_api"
)

func main() {
    r := http_api.NewHttpApi()
    // Define your routes here
    controller := r.Controller("/api")
    controller.Get("/test", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Test"})
    })
    log.Fatal(r.Run())
}
```

## Config

| Var                   | Description
|-----------------------|-----------
| Mode                  | Gin mode ("release", "debug", "test")
| PORT                  | Port to run the server on
| CORS_ALLOW_ORIGIN     | Allowed origins
