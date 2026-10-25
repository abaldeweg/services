package validation_test

import (
	"testing"

	"github.com/abaldeweg/services/packages/http_api/pkg/validation"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

type sample struct {
	Field string `validate:"test_custom" binding:"test_custom"`
}

func TestNewValidator(t *testing.T) {
	v, err := validation.NewValidator()
	if err != nil {
		t.Fatalf("NewValidator() failed: %v", err)
	}
	if v == nil || v.Engine == nil {
		t.Fatal("expected a non-nil Validator with an initialized Engine")
	}
	if v.Engine != binding.Validator.Engine() {
		t.Error("expected Engine to be gin's binding validator engine")
	}
}

func TestAddValidator_RegisterValidators(t *testing.T) {
	validation.AddValidator("test_custom", func(fl validator.FieldLevel) bool {
		return fl.Field().String() == "valid"
	})

	v, err := validation.NewValidator()
	if err != nil {
		t.Fatalf("NewValidator() failed: %v", err)
	}
	if err := v.RegisterValidators(); err != nil {
		t.Fatalf("RegisterValidators() failed: %v", err)
	}

	if err := v.Engine.Struct(sample{Field: "valid"}); err != nil {
		t.Errorf("expected valid, got: %v", err)
	}
	if err := v.Engine.Struct(sample{Field: "invalid"}); err == nil {
		t.Error("expected error for invalid field, got nil")
	}
}

func TestAddValidator_Panics(t *testing.T) {
	fn := func(fl validator.FieldLevel) bool { return true }

	t.Run("empty name", func(t *testing.T) {
		defer func() {
			if recover() == nil {
				t.Error("expected panic for an empty name")
			}
		}()
		validation.AddValidator("", fn)
	})

	t.Run("nil function", func(t *testing.T) {
		defer func() {
			if recover() == nil {
				t.Error("expected panic for a nil function")
			}
		}()
		validation.AddValidator("test_nil", nil)
	})

	t.Run("duplicate name", func(t *testing.T) {
		validation.AddValidator("test_duplicate", fn)

		defer func() {
			if recover() == nil {
				t.Error("expected panic for a duplicate name")
			}
		}()
		validation.AddValidator("test_duplicate", fn)
	})

	v, err := validation.NewValidator()
	if err != nil {
		t.Fatalf("NewValidator() failed: %v", err)
	}
	if err := v.RegisterValidators(); err != nil {
		t.Errorf("expected rejected validators to leave no entries behind, got: %v", err)
	}
}
