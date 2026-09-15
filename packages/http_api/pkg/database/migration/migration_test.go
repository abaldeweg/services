package migration_test

import (
	"os"
	"path/filepath"
	"slices"
	"testing"
	"testing/fstest"

	"github.com/abaldeweg/services/packages/http_api/pkg/database/migration"
)

func TestLoad_ValidFiles(t *testing.T) {
	dir := fstest.MapFS{
		"1.sql": &fstest.MapFile{Data: []byte("CREATE TABLE a (id INTEGER);")},
		"2.sql": &fstest.MapFile{Data: []byte("CREATE TABLE b (id INTEGER);")},
	}

	migrations, err := migration.Load(dir, ".sql")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(migrations) != 2 {
		t.Fatalf("expected 2 migrations, got %d", len(migrations))
	}
	if migrations[0].Version != 1 || migrations[1].Version != 2 {
		t.Fatalf("unexpected versions: %+v", migrations)
	}
	if migrations[0].Script != "CREATE TABLE a (id INTEGER);" {
		t.Fatalf("unexpected script for version 1: %q", migrations[0].Script)
	}
}

func TestLoad_SortedAscendingNumerically(t *testing.T) {
	dir := fstest.MapFS{
		"10.sql": &fstest.MapFile{Data: []byte("-- ten")},
		"2.sql":  &fstest.MapFile{Data: []byte("-- two")},
		"1.sql":  &fstest.MapFile{Data: []byte("-- one")},
	}

	migrations, err := migration.Load(dir, ".sql")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	got := make([]int64, 0, len(migrations))
	for _, m := range migrations {
		got = append(got, m.Version)
	}

	want := []int64{1, 2, 10}
	if !slices.Equal(got, want) {
		t.Fatalf("expected order %v, got %v", want, got)
	}
}

func TestLoad_EmptyDir(t *testing.T) {
	dir := fstest.MapFS{}

	migrations, err := migration.Load(dir, ".sql")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(migrations) != 0 {
		t.Fatalf("expected no migrations, got %d", len(migrations))
	}
}

func TestLoad_RootNotExist(t *testing.T) {
	dir := os.DirFS(filepath.Join(t.TempDir(), "missing"))

	migrations, err := migration.Load(dir, ".sql")
	if err != nil {
		t.Fatalf("expected no error for a non-existent root, got: %v", err)
	}
	if migrations != nil {
		t.Fatalf("expected nil migrations, got %+v", migrations)
	}
}

func TestLoad_SkipsSubdirectory(t *testing.T) {
	dir := fstest.MapFS{
		"1.sql":     &fstest.MapFile{Data: []byte("-- root")},
		"dir/2.sql": &fstest.MapFile{Data: []byte("-- ignore")},
	}

	migrations, err := migration.Load(dir, ".sql")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(migrations) != 1 {
		t.Fatalf("expected 1 migration (subdirectories must be skipped), got %d: %+v", len(migrations), migrations)
	}
	if migrations[0].Version != 1 {
		t.Fatalf("expected the root-level migration, got version %d", migrations[0].Version)
	}
}

func TestLoad_SkipsInvalidFilenames(t *testing.T) {
	dir := fstest.MapFS{
		"1.sql":                    &fstest.MapFile{Data: []byte("-- valid")},
		"abc.sql":                  &fstest.MapFile{Data: []byte("-- invalid")},
		"2.txt":                    &fstest.MapFile{Data: []byte("-- invalid")},
		"3.sql.bak":                &fstest.MapFile{Data: []byte("-- invalid")},
		"99999999999999999999.sql": &fstest.MapFile{Data: []byte("-- overflow, invalid")},
		"2":                        &fstest.MapFile{Data: []byte("-- no extension")},
	}

	migrations, err := migration.Load(dir, ".sql")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(migrations) != 1 {
		t.Fatalf("expected 1 valid migration, got %d: %+v", len(migrations), migrations)
	}
	if migrations[0].Version != 1 {
		t.Fatalf("expected version 1, got %d", migrations[0].Version)
	}
}
