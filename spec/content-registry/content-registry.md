# Content Registry

The Content Registry is designed as a central, technology-neutral library. It serves as a "Single Source of Truth" for digital content intended to be delivered across various channels.

The Content Registry is intended for blogs, wikis, landing pages, news, knowledge bases, podcasts, microblogs, newsletters, and more.

The registry delivers pure raw data. Therefore, it only provides the interface through which external systems (CMS, web frontends, mobile apps) can retrieve the content in a predictable format. The library does not make any decisions regarding rendering (HTML, app view, print), handles no user management, no access control, and does not store asset files. The registry only stores asset references inside revisions.

## Normative Rules

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", and "MAY" are to be interpreted as described in RFC 2119.

## Record Schema

### `version`

| Type    | Required | Default |
| ------- | -------- | ------- |
| Integer | Yes      | `1`     |

If a calling system provides a version, the Content Registry MUST use that value. If it is omitted, the Content Registry MUST set it to the latest supported version.

### `namespace`

| Type   | Required | Default |
| ------ | -------- | ------- |
| String | Yes      | -       |

A unique custom defined identifier for the Record.

For the Content Registry, it is merely an ID; higher-level systems can add semantics.

Allowed characters MUST only be `0-9`, `a-z`, `-`, `_`, `.` and `/`. The `namespace` MUST NOT exceed a length of 255 characters.

It allows having multiple projects, e.g., websites with different collections like a landing page or a blog, or differentiating an article between multiple languages.

Examples:

- `project/collection/article/en`
- `project/collection/article/de`

### `labels`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

An object consisting of freely definable labels.

A record maps labels to immutable revisions. Revisions contain all content and metadata.

Label names MUST be 1 to 64 characters long and use only `a-z`, `0-9`, `-`, `_`, and `.`.

Each label points to the hash of the current head revision of that label. Hash references MUST include the hashing algorithm as a lowercase prefix followed by `:` and the hash value, for example `sha256:abc123`.

The field only exists if at least one key with a revision is assigned to the record. Every label MUST have a revision assigned to it; otherwise, the label MUST NOT be created or MUST be removed.

### Record JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["version", "namespace"],
  "properties": {
    "version": {
      "type": "integer",
      "minimum": 1,
      "default": 1
    },
    "namespace": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255,
      "pattern": "^[0-9a-z._/-]+$"
    },
    "labels": {
      "type": "object",
      "minProperties": 1,
      "propertyNames": {
        "type": "string",
        "minLength": 1,
        "maxLength": 64,
        "pattern": "^[a-z0-9._-]+$"
      },
        "additionalProperties": {
          "type": "string",
          "pattern": "^[a-z0-9]+:[a-f0-9]+$"
        }
    }
  }
}
```

### Record Example

```json
{
  "version": 1,
  "namespace": "project/collection/article/en",
  "labels": {
    "main": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "draft": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}
```

## Revision Schema

### `version`

| Type    | Required | Default |
| ------- | -------- | ------- |
| Integer | Yes      | `1`     |

If a calling system provides a version, the Content Registry MUST use that value. If it is omitted, the Content Registry MUST set it to the latest supported version.

### `id`

| Type   | Required | Default |
| ------ | -------- | ------- |
| String | Yes      | -       |

The ID is a hash consisting of `version`, `parent`, `created_at`, `meta`, `document`, and `assets`; other keys, especially the `id` itself, MUST NOT be present. Hash references MUST include the hashing algorithm as a lowercase prefix followed by `:` and the hash value, for example `sha256:abc123`. To guarantee identical IDs across different platforms, the revision MUST be brought into a canonical JSON form before hashing using the JSON Canonicalization Scheme (JCS) according to RFC 8785.

`created_at` is part of the revision and therefore included in the revision hash. Two revisions with identical document content but different timestamps are considered distinct revisions. This value MUST only be calculated by the Content Registry.

### `parent`

| Type           | Required | Default |
| -------------- | -------- | ------- |
| String \| null | Yes      | `null`  |

A hash acting as a reference to the previous revision. Hash references MUST include the hashing algorithm as a lowercase prefix followed by `:` and the hash value, for example `sha256:abc123`.

If `parent` is `null`, it marks the beginning of a history.

This value MUST only be set or changed by the Content Registry.

### `created_at`

| Type            | Required | Default |
| --------------- | -------- | ------- |
| ISO 8601 String | Yes      | now     |

This value MUST be encoded as ISO 8601 strings in UTC using the `Z` suffix and MUST only be set or changed by the Content Registry.

### `meta`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

Variable data that describes the article in more detail.

The Content Registry is responsible for storing the data, but the further processing, validation, and sanitization are solely up to the higher-level systems.

Implementations MAY enforce limits on maximum meta size. If limits are exceeded, the operation MUST fail.

The limit MUST be read from `limits.meta_max_bytes` in the configuration.

### `document`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

Encapsulation of the actual content.

The Content Registry is responsible for storing the data, but the further processing, validation, and sanitization are solely up to the higher-level systems.

Implementations MAY enforce limits on maximum document size. If limits are exceeded, the operation MUST fail.

The limit MUST be read from `limits.document_content_max_bytes` in the configuration.

### `document.format`

| Type   | Required | Default |
| ------ | -------- | ------- |
| String | No       | -       |

Technical type of the content (e.g., Markdown, HTML, TipTap JSON, Plain Text, Structured JSON).

A version number SHOULD be appended to the key, e.g., `markdown-v2`.

### `document.content`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| String \| Object | No       | -       |

The actual payload.

If either `document.format` or `document.content` is present, the other MUST also be present.

### `assets`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

Map of linked media files.

It is a key-value map. The key MUST be unique within the object and contains the filename including the extension. The asset key corresponds to the filename referenced inside the document content. The value is a hash reference; hash references MUST include the hashing algorithm as a lowercase prefix followed by `:` and the hash value, for example `sha256:abc123`.

Asset keys MUST be normalized to lowercase to prevent collisions across calling systems.

If an asset is changed, the old version remains referenced by previous revisions.

The Content Registry stores only the reference metadata in the revision, not the physical file. Validation, sanitization, storage, and delivery of the physical asset are solely up to the higher-level systems.

Implementations MAY enforce limits on maximum number of assets per revision. If limits are exceeded, the operation MUST fail.

The limit MUST be read from `limits.assets_max_count` in the configuration.

### Revision JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["version", "id", "parent", "created_at"],
  "properties": {
    "version": {
      "type": "integer",
      "minimum": 1,
      "default": 1
    },
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9]+:[a-f0-9]+$"
    },
    "parent": {
      "anyOf": [
        { "type": "string", "pattern": "^[a-z0-9]+:[a-f0-9]+$" },
        { "type": "null" }
      ]
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "meta": {
      "type": "object"
    },
    "document": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "format": {
          "type": "string",
          "minLength": 1
        },
        "content": {
          "type": ["string", "object"]
        }
      },
      "dependentRequired": {
        "format": ["content"],
        "content": ["format"]
      }
    },
    "assets": {
      "type": "object",
      "additionalProperties": {
        "type": "string",
        "pattern": "^[a-z0-9]+:[a-f0-9]+$"
      }
    }
  }
}
```

## Revision Example

```json
{
  "version": 1,
  "id": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "parent": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "created_at": "2026-03-12T14:30:00Z",
  "meta": {
    "title": "Title",
    "author": "Author",
    "published_at": "2026-03-12T12:00:00Z"
  },
  "document": {
    "format": "markdown",
    "content": "# Title\n\n![Architecture](hero-image-architecture.webp)\n\nContent"
  },
  "assets": {
    "hero-image-architecture.webp": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}
```

## Configuration

The Content Registry MUST expose a configuration object with sensible defaults.

Higher-level systems (e.g., CMS) MAY override these values.

### Configuration Schema

#### `limits`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| Object           | Yes      | -       |

Defines various limits for the Content Registry.

Implementations MUST enforce these limits and reject operations that exceed them.

#### `limits.meta_max_bytes`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| Integer          | Yes      | 65536   |

Defines the maximum allowed byte size for the `meta` field in a revision.

If the size of the `meta` field exceeds this limit, the operation MUST fail with error code `INVALID_ARGUMENT`.

#### `limits.document_content_max_bytes`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| Integer          | Yes      | 1048576 |

Defines the maximum allowed byte size for the `document.content` field in a revision.

If the size of the `document.content` field exceeds this limit, the operation MUST fail with error code `INVALID_ARGUMENT`.

#### `limits.assets_max_count`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| Integer          | Yes      | 128     |

Defines the maximum allowed number of assets in a revision.

If the number of assets exceeds this limit, the operation MUST fail with error code `INVALID_ARGUMENT`.

#### `storage`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| Object           | Yes      | -       |

Object containing selected storage provider and a list of available providers with their configuration.

#### `storage.db.type`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| String           | Yes      | -       |

Allowed values MUST match one of the keys defined under `storage.db.providers`.

Because this is a cross-field key reference, standard JSON Schema cannot enforce this constraint. Implementations MUST validate this relation at runtime.

#### `storage.db.providers`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| Object           | Yes      | -       |

Defines the set of allowed storage providers.

The implementation is responsible for defining provider names and their configuration fields.

### Configuration JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["limits", "storage"],
  "properties": {
    "limits": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "meta_max_bytes",
        "document_content_max_bytes",
        "assets_max_count"
      ],
      "properties": {
        "meta_max_bytes": {
          "type": "integer",
          "minimum": 1,
          "default": 65536
        },
        "document_content_max_bytes": {
          "type": "integer",
          "minimum": 1,
          "default": 1048576
        },
        "assets_max_count": {
          "type": "integer",
          "minimum": 1,
          "default": 128
        }
      }
    },
    "storage": {
      "type": "object",
      "additionalProperties": false,
      "required": ["db"],
      "properties": {
        "db": {
          "type": "object",
          "additionalProperties": false,
          "required": ["type", "providers"],
          "properties": {
            "type": {
              "type": "string",
              "minLength": 1
            },
            "providers": {
              "type": "object",
              "minProperties": 1,
              "propertyNames": {
                "type": "string",
                "minLength": 1
              },
              "additionalProperties": {
                "type": "object"
              }
            }
          }
        }
      }
    }
  }
}
```

### Configuration Example

```json
{
  "limits": {
    "meta_max_bytes": 65536,
    "document_content_max_bytes": 1048576,
    "assets_max_count": 128
  },
  "storage": {
    "db": {
        "type": "filesystem",
        "providers": {
            "filesystem": {
                "path": "./data/content-registry"
            },
            "sqlite": {
                "path": "./data",
                "filename": "content-registry.db"
            },
            "mongodb": {
                "uri": "mongodb://localhost:27017/content_registry"
            }
        }
    }
  }
}
```

## Programmatic API

This specification describes an API. How it is exposed (e.g. HTTP, gRPC) is not defined here.

All write operations MUST be executed atomically.

On failure, methods MUST return an error code. The representation of the error response is implementation-defined and MAY follow the conventions of the target language ecosystem.

The following error codes are defined:

- `ALREADY_EXISTS`
- `NOT_FOUND`
- `CONFLICT`
- `INVALID_ARGUMENT`

Records are permanent. The registry does not provide record deletion. This decision may be revisited in a future version.

### `listRecords(limit: 100, cursor?) -> { "items": "Array<Record>", "next_cursor": "String | null", "has_more": "Boolean" }`

Returns a paginated list of records sorted alphabetically by `namespace`.

The cursor corresponds to the `namespace` of the last returned record; the following page begins immediately after this value.

If no records are found, `items` is an empty array and `next_cursor` is `null`.

### `createRecord(namespace) -> Boolean`

Creates a new record.

This method is intended for explicit pre-registration of a namespace before any content exists.

The created record is empty (no labels, no revisions).

Returns `true` on success.

If the `namespace` already exists, the method MUST fail with error code `ALREADY_EXISTS`.

### `getRecord(namespace) -> Record`

Retrieves a specific record by `namespace`.

If the `namespace` does not exist, the method MUST fail with error code `NOT_FOUND`.

### `deleteLabel(namespace, label) -> Boolean`

Removes a label.

If the `namespace` does not exist or the `label` does not exist in the namespace, the request is considered successful.

### `setLabel(namespace, label, revision_id) -> Boolean`

Sets the label pointer directly to any existing revision.

The `revision_id` is namespace-independent and MAY reference a revision originally created under any namespace.

This allows the calling system (e.g., a CMS) to perform merges, rollbacks, or history rewrites on the application level and then commit the result as a regular revision before pointing the label to it.

The registry is intentionally not responsible for content-level merge logic.

If the `namespace` or the `revision_id` do not exist, the method MUST fail with error code `NOT_FOUND`.

If the `label` does not exist in the namespace, it is newly created.

### `commitRevision(namespace, label, meta: null, document: null, assets: null, expected_parent?, version?) -> String`

Creates a new revision of a record, updates the label's head pointer to the new revision, and returns the new revision `id`.

If a `version` is provided, the registry MUST use that value. If it is omitted, the registry MUST set it to the latest supported version. It also sets `created_at` and calculates the `id`. The `parent` is automatically taken from the current state of the `label`.

If the `namespace` or the `label` do not exist, they are newly created.

This method is therefore the lazy-creation path: the first successful commit MAY create the record and its initial label in one atomic operation.

Use `createRecord` when a namespace SHOULD be reserved before the first revision exists.

Optionally, the expected `parent` can be specified. This prevents a revision from being overwritten unnoticed. If two users are editing a revision at the same time, one revision could overwrite the other unnoticed. The user MUST consciously agree to the overwrite and, if necessary, be given the option for a manual merge. Therefore, the method MUST fail with error code `CONFLICT` if the `expected_parent` does not match.

The registry does not validate the physical existence of files. It is RECOMMENDED that calling systems (e.g., a CMS) check whether all referenced asset hashes are available in the target storage before a `commitRevision`.

### `getRevision(revision_id) -> Revision`

Retrieves a specific revision.

If the `revision_id` does not exist, the method MUST fail with error code `NOT_FOUND`.

### `restoreRevision(namespace, label, revision_id) -> String`

Creates a new revision using the content of the specified `revision_id` and updates the label's head pointer to the new revision.

The `revision_id` MUST be part of the current history of the specified `namespace` and `label`.

Returns the new revision `id`.

The new revision uses the current label head as its parent, receives a new `created_at` timestamp and receives a new revision id (hash).

The original revision remains unchanged.

If the `namespace` or the `label` do not exist, the method MUST fail with error code `NOT_FOUND`.

If the `revision_id` does not exist or is not part of the current history of the specified `label`, the method MUST fail with error code `NOT_FOUND`.

### `getRevisions(namespace, label, limit: 20, cursor?) -> { "items": "Array<Revision>", "next_cursor": "String | null", "has_more": "Boolean" }`

Returns a paginated list of revisions for a specific label's history.

The revisions are returned in reverse chronological order (from newest to oldest), starting from the current head of the label and recursively following the `parent` hashes.

The `cursor` represents the revision hash (`id`) of the last returned revision. The next page starts with the parent of this hash. If the end of the history is reached (the parent is `null`), `next_cursor` is `null` and `has_more` is `false`.

If the `namespace` does not exist, or the `label` does not exist in the namespace, the method MUST fail with error code `NOT_FOUND`.

## Security Considerations

This specification does not define authentication or authorization. Consumers MUST ensure that only authorized actors can perform write and read operations.

Implementations SHOULD consider rate limiting to reduce abuse and service exhaustion.

Higher-level systems like CMSs are responsible for validating `meta`, `document`, `assets`, and `namespace` before calling the API to prevent code injection or other issues.
