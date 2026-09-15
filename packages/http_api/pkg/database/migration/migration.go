package migration

import (
	"cmp"
	"errors"
	"fmt"
	"io/fs"
	"log"
	"regexp"
	"slices"
	"strconv"
)

// Migration represents a single database migration, including its version and script content.
type Migration struct {
	Version int64
	Script  string
}

// Load reads migration files from the specified directory, parses their
// versions, and returns a sorted list of Migration objects.
func Load(dir fs.FS, ext string) ([]Migration, error) {
	entries, err := fs.ReadDir(dir, ".")
	if err != nil {
		if errors.Is(err, fs.ErrNotExist) {
			return nil, nil
		}
		return nil, err
	}

	pattern := regexp.MustCompile(`^([0-9]+)` + regexp.QuoteMeta(ext) + `$`)

	migrations := []Migration{}
	for _, entry := range entries {
		name := entry.Name()

		if entry.IsDir() {
			log.Printf("migration: skipping subdirectory %q", name)
			continue
		}

		m := pattern.FindStringSubmatch(name)
		if m == nil {
			log.Printf("migration: skipping invalid file %q: filename must be of the form <version>%s", name, ext)
			continue
		}

		version, err := strconv.ParseInt(m[1], 10, 64)
		if err != nil {
			log.Printf("migration: skipping invalid file %q: %v", name, err)
			continue
		}

		script, err := fs.ReadFile(dir, name)
		if err != nil {
			return nil, fmt.Errorf("failed to read migration %q: %w", name, err)
		}

		migrations = append(migrations, Migration{
			Version: version,
			Script:  string(script),
		})
	}

	slices.SortFunc(migrations, func(a, b Migration) int {
		return cmp.Compare(a.Version, b.Version)
	})

	return migrations, nil
}
