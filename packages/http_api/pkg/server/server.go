package server

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"os/signal"
	"slices"
	"syscall"
	"time"

	"github.com/abaldeweg/services/packages/http_api/pkg/middlewares/cors"
	"github.com/fatih/color"
	"github.com/gin-gonic/gin"
)

// Server wraps http.Server with graceful shutdown support.
type Server struct {
	HTTPServer *http.Server
	Router     *gin.Engine
	Mode       string
	Messages   []string
}

// NewServer creates a new Server instance.
func NewServer(port int, mode string) (*Server, error) {
	if port <= 0 || port > 65535 {
		return nil, fmt.Errorf("invalid port: %d", port)
	}

	srv := &Server{}

	modes := []string{"release", "debug", "test"}
	if slices.Contains(modes, mode) {
		gin.SetMode(mode)
		srv.Mode = gin.Mode()
	}

	srv.Router = gin.Default()

	srv.HTTPServer = &http.Server{
		Addr:              fmt.Sprintf(":%d", port),
		Handler:           srv.Router,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	srv.AddMessage(color.BlueString("Server running at http://127.0.0.1%s", srv.HTTPServer.Addr))

	return srv, nil
}

// Run starts the server with default OS signal handling (SIGINT, SIGTERM)
// and gracefully shuts down.
func (s *Server) Run() error {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	return s.RunWithContext(ctx)
}

// RunWithContext starts the server and gracefully shuts down when ctx is done.
func (s *Server) RunWithContext(ctx context.Context) error {
	serverErrors := make(chan error, 1)
	go func() {
		addr := s.HTTPServer.Addr
		if addr == "" {
			addr = ":http"
		}
		ln, err := net.Listen("tcp", addr)
		if err != nil {
			serverErrors <- err
			close(serverErrors)
			return
		}

		for i := range s.Messages {
			fmt.Print(s.Messages[i] + "\n")
		}

		if err := s.HTTPServer.Serve(ln); err != nil && !errors.Is(err, http.ErrServerClosed) {
			serverErrors <- err
		}
		close(serverErrors)
	}()

	select {
	case err, ok := <-serverErrors:
		if !ok {
			return nil
		}
		return fmt.Errorf("server error: %w", err)
	case <-ctx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := s.HTTPServer.Shutdown(shutdownCtx); err != nil {
			_ = s.HTTPServer.Close()
			return fmt.Errorf("could not stop server gracefully: %w", err)
		}
	}

	return nil
}

// AddMessage adds a message to be displayed when the server starts.
func (s *Server) AddMessage(msg string) {
	if msg != "" {
		s.Messages = append(s.Messages, msg)
	}
}

// SetCORS configures the CORS middleware for the server
// with the specified allowed origins and headers.
func (s *Server) SetCORS(corsAllowOrigin, corsAllowHeaders string) {
	if s.Router != nil {
		s.Router.Use(cors.CORS(corsAllowOrigin, corsAllowHeaders))
	}
}
