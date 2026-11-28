# Architecture

## Monorepo-Structure

This structure organizes your codebase around self-contained modules, promoting code reuse.

- `apps/`: This directory contains all of the executable applications. These are typically the public-facing or end-user facing parts of a project, such as a web frontend, an API server, or a command-line tool. An app consumes packages from the `packages` directory.
- `packages/`: This directory holds all the reusable libraries that are shared across the applications. A package is a dependency that can be imported by one or more apps across different repositories.
- `notebooks/`: This directory contains notebooks for data analysis or experimentation.
- `scripts/`: Shell scripts are the universal language for automating build and test processes. They're natively supported on all major operating systems and CI/CD environments, ensuring the commands run everywhere.

## Package Naming

To avoid name conflicts, package names must be unique between `apps/`, `packages/` and `packages-*/`. A package with the same name must not exist in both `apps/` and `packages/` at the same time.

For JavaScript, it's possible to make use of vendor prefixes (e.g., `@baldeweg/auth`) to ensure uniqueness.

The goal is to avoid renaming or moving packages later by choosing unique and descriptive names from the start.

## Testing

Tests are placed alongside the code they test.

| Language      | Test File Pattern     |
|---------------|-----------------------|
| JavaScript    | `.test.js`            |
| TypeScript    | `.test.ts`            |
| Go            | `*_test.go`           |

### Security

All npm packages should use trusted publishing. This needs to be [configured on npm](https://docs.npmjs.com/trusted-publishers).

Dependencies should be pinned to exact versions to reduce the risk of supply chain attacks.
