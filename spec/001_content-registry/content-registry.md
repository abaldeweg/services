# Content Registry

⚠️ **Draft:** This specification is not yet stable and may change at any time without prior notice. Do not use as a basis for production implementations.

| Field   | Value |
|---------|-------|
| Status  | Draft |
| Version | 1.0.0 |

## Changelog

## Abstract

The Content Registry is a central, technology-neutral library serving as a Single Source of Truth for digital content intended for delivery across various channels, including blogs, wikis, landing pages, news, knowledge bases, podcasts, microblogs, newsletters, and more.

The registry delivers pure raw data and provides the interface through which external systems - such as CMSs, web frontends, and mobile apps — can retrieve content in a predictable format. The Content Registry stores records, revisions, labels, and asset references.

The library does not make decisions regarding rendering (HTML, app view, print), does not handle user management or access control, and does not store physical asset files. Asset references are stored inside revisions only.

## 1. Terminology

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", and "MAY" in this document are to be interpreted as described in RFC 2119.

## 2. Schema Versioning

The `version` field appears in `Record`, `Revision`, and in API operations that create or mutate revisions. Implementations MUST validate the provided `version` against the supported versions.

### 2.1. Supported Schema Versions

- `1`

### 2.2. Defaulting and Validation

If a calling system provides a `version`, the Content Registry MUST use that value.

If `version` is omitted, the Content Registry MUST set it to the latest supported version. The provided value MUST be one of the supported versions listed in Section 2.1.

## 3. Record Schema

### 3.1. Fields

#### `version`

| Type    | Required | Default |
| ------- | -------- | ------- |
| Integer | Yes      | `1`     |

See [Section 2](#2-schema-versioning) for supported values and defaulting.

#### `namespace`

| Type   | Required | Default |
| ------ | -------- | ------- |
| String | Yes      | -       |

A unique, custom-defined identifier for the record. For the Content Registry, it is merely an ID; higher-level systems may add semantics.

Allowed characters MUST only be `0-9`, `a-z`, `-`, `_`, `.`, and `/`.

The `namespace` MUST NOT exceed 255 characters in length.

*It allows having multiple projects - for example, websites with different collections such as a landing page or a blog - or differentiating an article between multiple languages.*

Examples:

```text
project/collection/article/en
project/collection/article/de
```

#### `labels`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

An object consisting of freely definable labels. A record maps labels to immutable revisions; a label's value MAY also be `null` to indicate an unassigned label. Revisions contain all content and metadata.

Label names MUST be 1 to 64 characters long and use only `a-z`, `0-9`, `-`, `_`, and `.`.

Each label's value is either the hash of the current head revision of that label or `null` (see [Section 7](#7-security-considerations)).

### 3.2. JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["version", "namespace"],
  "properties": {
    "version": {
      "type": "integer",
      "enum": [1],
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
        "anyOf": [
          {
            "type": "string",
            "pattern": "^[a-z0-9]+:[a-f0-9]+$"
          },
          { "type": "null" }
        ]
      }
    }
  }
}
```

### 3.3. Example

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

## 4. Revision Schema

### 4.1. Fields

#### `version`

| Type    | Required | Default |
| ------- | -------- | ------- |
| Integer | Yes      | `1`     |

See [Section 2](#2-schema-versioning) for supported values and defaulting.

#### `id`

| Type   | Required | Default |
| ------ | -------- | ------- |
| String | Yes      | -       |

The ID is a hash computed from `version`, `parent`, `created_at`, `attributes`, `document`, and `assets`. Other keys - especially `id` itself - MUST NOT be present during hash computation (see [Section 7](#7-security-considerations)).

To guarantee identical IDs across different platforms, the revision MUST be brought into canonical JSON form before hashing, using the JSON Canonicalization Scheme (JCS) as specified in RFC 8785. The order of keys for hashing is determined by JCS.

`created_at` is part of the revision and is therefore included in the revision hash. Two revisions with identical document content but different timestamps are considered distinct revisions.

This value MUST only be calculated by the Content Registry.

#### `parent`

| Type           | Required | Default |
| -------------- | -------- | ------- |
| String \| null | Yes      | `null`  |

A hash acting as a reference to the previous revision (see [Section 7](#7-security-considerations)).

If `parent` is `null`, it marks the beginning of a history.

If the label has no assigned revision (i.e., its value is `null`), the new revision MUST use `null` as its parent, thereby starting a new revision history.

This value MUST only be set or changed by the Content Registry.

#### `created_at`

| Type            | Required | Default |
| --------------- | -------- | ------- |
| ISO 8601 String | Yes      | now     |

This value MUST be encoded as an ISO 8601 string in UTC using the `Z` suffix and MUST only be set or changed by the Content Registry.

#### `attributes`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

Variable data that describes the article in more detail. The Content Registry does not enforce any structure or required fields within `attributes`.

Subject to `limits.attributes_max_bytes` (see [Section 5.1](#51-fields)).

#### `document`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

Encapsulation of the actual content.

Subject to `limits.document_content_max_bytes` (see [Section 5.1](#51-fields)).

#### `document.format`

| Type   | Required | Default |
| ------ | -------- | ------- |
| String | No       | -       |

Technical type of the content (e.g., Markdown, HTML, JSON, Plain Text). A version number SHOULD be appended to the value, e.g., `markdown-v2`.

#### `document.content`

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| String \| Object | No       | -       |

The actual payload. If either `document.format` or `document.content` is present, the other MUST also be present.

#### `assets`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | No       | -       |

A key-value map of linked media files.

The key MUST be unique within the object and contains the filename including the extension. The asset key corresponds to the filename referenced inside the document content. The value is a hash reference (see [Section 7](#7-security-considerations)).

Asset keys MUST be normalized to lowercase to prevent collisions across calling systems.

If an asset is changed, the old version remains referenced by previous revisions.

Subject to `limits.assets_max_count` (see [Section 5.1](#51-fields)).

### 4.2. JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["version", "id", "parent", "created_at"],
  "properties": {
    "version": {
      "type": "integer",
      "enum": [1],
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
    "attributes": {
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

### 4.3. Example

```json
{
  "version": 1,
  "id": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "parent": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "created_at": "2026-03-12T14:30:00Z",
  "attributes": {
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

## 5. Configuration

The Content Registry MUST expose a configuration object with sensible defaults. Higher-level systems (e.g., a CMS) MAY override these values.

### 5.1. Fields

#### `limits`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | Yes      | -       |

Defines various limits for the Content Registry. Implementations MUST enforce these limits and reject operations that exceed them. The order in which limits are validated is implementation-defined.

#### `limits.attributes_max_bytes`

| Type    | Required | Default |
| ------- | -------- | ------- |
| Integer | Yes      | 65536   |

Defines the maximum allowed byte size for the `attributes` field in a revision. If the size of the `attributes` field exceeds this limit, the operation MUST fail with error code `INVALID_ARGUMENT`.

#### `limits.document_content_max_bytes`

| Type    | Required | Default |
| ------- | -------- | ------- |
| Integer | Yes      | 1048576 |

Defines the maximum allowed byte size for the `document.content` field in a revision. If the size of the `document.content` field exceeds this limit, the operation MUST fail with error code `INVALID_ARGUMENT`.

#### `limits.assets_max_count`

| Type    | Required | Default |
| ------- | -------- | ------- |
| Integer | Yes      | 128     |

Defines the maximum allowed number of assets in a revision. If the number of assets exceeds this limit, the operation MUST fail with error code `INVALID_ARGUMENT`.

#### `storage`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | Yes      | -       |

Object containing the selected storage provider and a list of available providers with their configuration.

#### `storage.db.type`

| Type   | Required | Default |
| ------ | -------- | ------- |
| String | Yes      | -       |

Allowed values MUST match one of the keys defined under `storage.db.providers`. Because this is a cross-field key reference, standard JSON Schema cannot enforce this constraint.

Implementations MUST validate this relation at runtime.

#### `storage.db.providers`

| Type   | Required | Default |
| ------ | -------- | ------- |
| Object | Yes      | -       |

Defines the set of allowed storage providers. The implementation is responsible for defining provider names and their configuration fields.

### 5.2. JSON Schema

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
        "attributes_max_bytes",
        "document_content_max_bytes",
        "assets_max_count"
      ],
      "properties": {
        "attributes_max_bytes": {
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

### 5.3. Example

```json
{
  "limits": {
    "attributes_max_bytes": 65536,
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

## 6. Programmatic API

This specification describes an API. How it is exposed (e.g., HTTP, gRPC) is not defined here.

All write operations MUST be executed atomically.

On failure, methods MUST return an error code. The representation of the error response is implementation-defined.

### 6.1. Error Codes

The following error codes are defined:

| Code               | Description                                      |
| ------------------ | ------------------------------------------------ |
| `ALREADY_EXISTS`   | The resource already exists.                     |
| `NOT_FOUND`        | The requested resource could not be found.       |
| `CONFLICT`         | A concurrent modification conflict was detected. |
| `INVALID_ARGUMENT` | A provided argument is invalid.                  |

### 6.2. Record Permanence

Records are permanent. The registry does not provide record deletion. This decision may be revisited in a future version.

### 6.3. Methods

#### `listRecords`

```text
listRecords(limit: 100, cursor?) -> {
  "items": Array<Record>,
  "next_cursor": String | null,
  "has_more": Boolean
}
```

Returns a paginated list of records sorted alphabetically by `namespace`.

The cursor corresponds to the `namespace` of the last returned record; the following page begins immediately after this value.

If no records are found, `items` is an empty array and `next_cursor` is `null`.

#### `createRecord`

```text
createRecord(namespace) -> String
```

Creates a new record.

The created record is empty (no labels, no revisions). Returns the `namespace` of the created record on success.

If the `namespace` already exists, the method MUST fail with error code `ALREADY_EXISTS`.

#### `getRecord`

```text
getRecord(namespace) -> Record
```

Retrieves a specific record by `namespace`.

If the `namespace` does not exist, the method MUST fail with error code `NOT_FOUND`.

#### `deleteLabel`

```text
deleteLabel(namespace, label) -> Boolean
```

Removes a label.

The revision history remains intact and will not be removed.

If the `namespace` does not exist or the `label` does not exist in the namespace, the request is considered successful.

Removing a non-existent label MUST be treated as a no-op. `deleteLabel` is intentionally idempotent — deleting a missing label is a safe no-op that simplifies cleanup. `setLabel` and `getRecord` return `NOT_FOUND` to explicitly surface missing resources.

#### `createLabel`

```text
createLabel(namespace, label, revision_id?) -> Boolean
```

Creates a new label in the specified `namespace`.

If `revision_id` is provided, it MUST reference an existing revision; otherwise, the label is created with the value `null`.

If the `namespace` does not exist, the method MUST fail with error code `NOT_FOUND`.

If the `label` already exists in the namespace, the method MUST fail with error code `ALREADY_EXISTS`.

If a `revision_id` is provided but does not exist, the method MUST fail with error code `NOT_FOUND`.

On success, the method returns `true`.

#### `setLabel`

```text
setLabel(namespace, label, revision_id?) -> Boolean
```

Sets the label pointer directly to a revision or to `null` to mark the label as unassigned.

The `revision_id` is namespace-independent and MAY reference a revision originally created under any namespace.

If the `namespace` does not exist, or the `label` does not exist in the namespace, the method MUST fail with error code `NOT_FOUND`.

If a non-`null` `revision_id` is provided but the revision does not exist, the method MUST fail with error code `NOT_FOUND`.

The registry is intentionally not responsible for content-level merge logic.

#### `commitRevision`

```text
commitRevision(
  namespace,
  label,
  attributes: null,
  document: null,
  assets: null,
  expected_parent?,
  version?
) -> String
```

Creates a new revision of an existing record, updates the label's head pointer to the new revision, and returns the new `revision_id`.

If the `namespace` or the `label` do not exist, the method MUST fail with error code `NOT_FOUND`.

The `expected_parent` parameter is optional. It prevents a revision from being overwritten unnoticed. If two users are editing a revision at the same time, one revision could overwrite the other unnoticed. Therefore, the method MUST fail with error code `CONFLICT` if `expected_parent` does not match the current head. If two clients commit concurrently with the same `expected_parent`, one will succeed; the other receives `CONFLICT`.

If a revision with the same hash already exists, the operation MUST succeed and return the existing revision `id`.

See [Section 2](#2-schema-versioning) for supported values and defaulting of the `version` parameter. The method also sets `created_at` and calculates the `id`. The `parent` is automatically taken from the current state of the `label`.

The registry does not validate the physical existence of files. It is RECOMMENDED that calling systems (e.g., a CMS) verify that all referenced asset hashes are available in the target storage before calling `commitRevision`.

#### `getRevision`

```text
getRevision(revision_id) -> Revision
```

Retrieves a specific revision.

If the `revision_id` does not exist, the method MUST fail with error code `NOT_FOUND`.

#### `restoreRevision`

```text
restoreRevision(namespace, label, revision_id) -> String
```

Creates a new revision using the content of the specified `revision_id` and updates the label's head pointer to the new revision.

Returns the new revision `id`.

The `revision_id` MUST be part of the current history of the specified `namespace` and `label`.

The new revision uses the current label head as its parent, receives a new `created_at` timestamp, and receives a new revision `id` (hash). The original revision remains unchanged.

If the `namespace` or the `label` do not exist, the method MUST fail with error code `NOT_FOUND`.

If the label has no assigned revision (i.e., its value is `null`), the method MUST fail with error code `NOT_FOUND`.

If the `revision_id` does not exist or is not part of the current history of the specified `label`, the method MUST fail with error code `NOT_FOUND`.

#### `getRevisions`

```text
getRevisions(namespace, label, limit: 20, cursor?) -> {
  "items": Array<Revision>,
  "next_cursor": String | null,
  "has_more": Boolean
}
```

Returns a paginated list of revisions for a specific label's history.

Revisions are returned in reverse chronological order (newest to oldest), starting from the current head of the label and recursively following the `parent` hashes.

The `cursor` represents the revision hash (`id`) of the last returned revision. The next page starts with the parent of this revision. If the end of the history is reached (i.e., `parent` is `null`), `next_cursor` is `null` and `has_more` is `false`.

If the `namespace` does not exist, or the `label` does not exist in the namespace, the method MUST fail with error code `NOT_FOUND`.

If the label exists but has no assigned revision (i.e., its value is null), the method MUST return an empty result set.

## 7. Security Considerations

This specification does not define authentication or authorization. Consumers MUST ensure that only authorized actors can perform write and read operations.

Higher-level systems MAY treat `namespace` as an access-control boundary when defining authorization rules and content isolation.

Hash references MUST include the hashing algorithm as a lowercase prefix followed by `:` and the hash value (e.g., `sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`). Hash values MUST use lowercase hexadecimal encoding. Implementations MUST validate and enforce this format. SHA-256 is RECOMMENDED; other algorithms MAY be used if they follow the same format.

Implementations SHOULD consider rate limiting to reduce abuse and service exhaustion.

Higher-level systems such as CMSs are responsible for validating `attributes`, `document`, and `assets` before calling the API, in order to prevent code injection or other security issues.
