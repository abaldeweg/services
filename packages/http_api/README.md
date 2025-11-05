# http_api

http_api offers a simple abstraction around existing tools to run an HTTP API server, with router and CORS.

## Usage

Always set `MODE=release` in production environments for best performance and security.

You can set the Gin mode ("release", "debug", "test") via the environment variable `MODE`. If not set, it defaults to `debug`.

All origins are allowed by default. You should restrict allowed origins in production via the environment variable `CORS_ALLOW_ORIGIN`, providing a comma-separated list of allowed origins.

```go
package main

import (
    "log"

    "github.com/abaldeweg/services/http_api"
)

func main() {
    api := http_api.NewHttpApi()
    // Define your routes here
    controller := api.Controller("/api")
    controller.Get("/test", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Test"})
    })
    log.Fatal(api.Run())
}
```

## Env Vars

| Var                   | Defaults | Values                     | Description
|-----------------------|----------|----------------------------|-------------
| Mode                  | debug    | "release", "debug", "test" | Gin mode
| PORT                  | 8080     | int                        | Port to run the server on
| CORS_ALLOW_ORIGIN     | ""       | string                     | Allowed origins
