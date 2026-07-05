# Content Registry

⚠️ **Draft:** This specification is not yet stable and may change at any time without prior notice. Do not use as a basis for production implementations.

| Field   | Value |
|---------|-------|
| Status  | Draft |
| Version | 1.0.0 |

## Changelog

- 1.0.0: Initial release

## Abstract

The Content Registry is a central, technology-neutral library serving as a Single Source of Truth for digital content intended for delivery across various channels, including blogs, wikis, landing pages, news, knowledge bases, podcasts, microblogs, newsletters, and more.

The registry delivers pure raw data and provides the interface through which external systems - such as CMSs, web frontends, and mobile apps — can retrieve content in a predictable format.

The primary goal of the Content Registry is to store state. It is targeted at small and medium requirements while being designed to be extensible.

The library does not make decisions regarding rendering (HTML, app view, print), does not handle user management or access control, and does not store physical asset files. Asset references are stored inside revisions only.

## Versioning

This specification uses [SemVer](https://semver.org/) to track changes to the specification itself.

In schemas is only the first part (Major) of the version number used to indicate breaking changes, e.g. `1` for spec version `1.2.0`.

Implementations MUST validate the provided `version` against the supported versions.

If `version` is omitted, the Content Registry MUST set it to the latest supported version. The provided value MUST be one of the supported versions listed in this section.

## Terminology

Key words: The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", and "MAY" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

Implementations: Software systems that implement this Content Registry specification.

Consuming System: A system that uses the Content Registry to store and retrieve content. Examples include CMSs, web frontends, mobile apps, etc.

## 1. Document

### 1.1. Fields

#### `version`

- Type: Integer
- Required: Yes
- Default: latest supported version
- Limit: -
- Allowed Values: see [Versioning](#versioning)

Refers to the used spec version.

#### `id`

- Type: String
- Required: Yes
- Default: -
- Limit: -
- Allowed Values: UUID

This value MUST only be calculated by the Content Registry.

#### `created_at`

- Type: String
- Required: Yes
- Default: now
- Limit: -
- Allowed Values: ISO 8601 String in UTC using the `Z` suffix

This value MUST only be set or changed by the Content Registry.

#### `attributes`

- Type: Object | null
- Required: No
- Default: -
- Limit: -
- Allowed Values:-

Variable data that describes the article in more detail, e.g. meta data.

The Content Registry does not enforce any structure or required fields within `attributes`.

Subject to `attributes_max_bytes` (see [Section 2.1](#21-fields)).

#### `format`

- Type: String
- Required: Yes
- Default: -
- Limit: -
- Allowed Values: -

Technical type of the content (e.g., Markdown, HTML, JSON, Plain Text).

A version number SHOULD be appended to the value, e.g., `markdown-v2`.

#### `content`

- Type: String | Object
- Required: Yes
- Default: -
- Limit: -
- Allowed Values: -

The actual payload.

Subject to `document_content_max_bytes` (see [Section 2.1](#21-fields)).

#### `assets`

- Type: Object<String, String> | null
- Required: No
- Default: -
- Limit: -
- Allowed Values:
  - Keys: `^[a-z0-9._-]+$`
  - Values: `^[a-z0-9]+:[a-f0-9]+$` (asset hash)

A key-value map of linked media files.

The key MUST be unique within the object and contains the filename including the extension. The asset key corresponds to the filename referenced inside the document content.

Asset keys MUST be normalized to lowercase to prevent collisions across consuming systems.

If an asset is changed, the old version remains referenced by previous revisions.

Subject to `assets_max_count` (see [Section 2.1](#21-fields)).

### 1.2. Example

```json
{
  "version": 1,
  "id": "f8e0d210-3958-4c40-8e47-2e23b4dfb867",
  "created_at": "2026-03-12T14:30:00Z",
  "attributes": {
    "title": "Title",
    "author": "Author",
    "published_at": "2026-03-12T12:00:00Z"
  },
  "format": "markdown",
  "content": "# Title\n\n![Architecture](hero-image-architecture.webp)\n\nContent",
  "assets": {
    "hero-image-architecture.webp": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}
```

### 1.3. Programmatic API

The data can be stored in the filesystem, in a version control system, in a database or something else. This is completely implementation-defined. The following API MUST be present.

#### `listDocuments`

```text
listDocuments() -> {
  "items": Array<Document>
}
```

Lists all documents in the registry.

### `createDocument`

```text
createDocument(Document) -> String
```

Returns the uuid of the newly created document.

### `updateDocument`

```text
updateDocument(Document) -> void
```

Updates an existing document.

### `showDocument`

```text
showDocument(uuid) -> Document
```

Returns the document with the given uuid.

### `removeDocument`

```text
removeDocument(uuid) -> boolean
```

Removes the document with the given uuid. Returns `true` if the document was removed, `false` if not.

## 2. Configuration

The Content Registry MUST expose a configuration object with sensible defaults. Consuming systems MAY override these values. Implementations MAY extend the configuration with additional fields.

If limits are exceeded, the operation MUST fail with error code `INVALID_ARGUMENT`.

### 2.1. Fields

#### `attributes_max_bytes`

- Type: Integer
- Required: Yes
- Default: `65536`
- Limit: -
- Allowed Values: -

Defines the maximum allowed byte size for the `attributes` field in a revision.

Byte size is measured as the encoded byte length of the serialized JSON.

#### `document_content_max_bytes`

- Type: Integer
- Required: Yes
- Default: `1048576`
- Limit: -
- Allowed Values: -

Defines the maximum allowed byte size for the `document.content` field in a revision.

Byte size is measured as the encoded byte length of the serialized JSON.

#### `assets_max_count`

- Type: Integer
- Required: Yes
- Default: `128`
- Limit: -
- Allowed Values: -

Defines the maximum allowed number of assets in a revision.

## 3. Security Considerations

Implementations MUST validate and enforce schema constraints. Consuming systems are responsible for validating `attributes`, `document`, and `assets` before calling the API, in order to prevent code injection or other security issues.

This specification does not define authentication or authorization. Consuming systems MUST ensure that only authorized actors can perform write and read operations. Consuming systems SHOULD record the actor identity alongside each write operation.

Hash references MUST include the hashing algorithm as a lowercase prefix followed by `:` and the hash value (e.g., `sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`). Hash values MUST use lowercase hexadecimal encoding. Implementations MUST validate and enforce this format. SHA-256 is RECOMMENDED; other algorithms MAY be used if they follow the same format.
