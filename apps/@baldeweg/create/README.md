# Create

A simple project generator with profile-based configuration for creating a monorepo.

## Overview

## Installation

```bash
pnpm install -g @baldeweg/create
```

or

```bash
npx @baldeweg/create
```

## Usage

The CLI will prompt you to select one or more profiles to run. This will display a multi-select interface where you can choose any combination of the available profiles.

```bash
baldeweg-create
```

## Monorepo Structure

This structure organizes your codebase around self-contained modules, promoting code reuse.

- `apps/`: This directory contains all of your executable applications. These are typically the public-facing or end-user facing parts of your project, such as a web frontend, an API server, or a command-line tool. An app consumes packages from the `packages` directory.
- `packages/`: This directory holds all the reusable libraries that are shared across your applications. A package is a dependency that can be imported by one or more apps.
- `scripts/`: Shell scripts are the universal language for automating your build and test processes. They're natively supported on all major operating systems and CI/CD environments, ensuring your commands run everywhere.

### Testing

Tests are placed alongside the code they test. For JavaScript/VueJS, this means `.test.js` files and for Go, `*_test.go` files.

### Dealing with Naming Conflicts

We try to find new, unique names for each package to avoid conflicts. For JavaScript, you can make use of vendor prefixes (e.g., `@baldeweg/auth`) to ensure uniqueness.

The goal is to avoid renaming or moving packages later by choosing unique and descriptive names from the start.

We do not use a subdirectory for every language. This is because if you have a JavaScript library called `auth` and, a few years later, you want to add a Go package with the same name, you would have to move the existing JS package, which is disruptive.

## Profiles

### Write a profile

A Profile is a modular action or set of actions that can be executed to scaffold, configure, or modify a project. Each profile encapsulates specific tasks, such as creating a directory structure, generating configuration files, or merging dependencies.

Profiles are defined as objects implementing the `Profile` interface (see `src/types/types.ts`):

```typescript
export interface Profile {
    name: string;
    description: string;
    ask?: () => Promise<void | Record<string, any>>;
    run: (options: Record<string, any>) => Promise<void>;
}
```

- `name`: Unique identifier for the profile.
- `description`: Short description of what the profile does.
- `ask` (optional): An async function to prompt the user for input before running the profile.
- `run`: The main async function that performs the profile's action.

Here is a minimal example of a profile that creates a basic directory structure:

```typescript
import { createDirs } from '../../helpers/createDirs.js';
import { Profile } from '../../types/types';

export const baseAction: Profile = {
  name: 'base',
  description: 'Create basic directory structure with apps/ and packages/ directories',
  run: async (options) => {
    createDirs(['apps', 'packages']);
  }
};
```

To make your profile available add it to the `profiles` object in `src/profiles/registry.ts`.

### Helpers

Helpers should create as much as possible e.g. if creating a file also create the directories.

Nothing should be overwritten. If a file already exists, it should be skipped with a notice.

The following helper functions are available for use in profiles.

#### `createDirs(dirs: string[]): void`

Creates directories if they do not exist.

**Usage:**

```typescript
import { createDirs } from './src/helpers';

createDirs(['apps', 'packages']);
```

#### `copyFile(sourcePath: string, targetPath: string): void`

Copies a file from the templates directory to the specified target location. Useful for binary files, like images. If the target file already exists, it is skipped with a notice.

**Usage:**

```typescript
import { copyFile } from './src/helpers';

copyFile('base/image.png', 'apps/web/public/image.png');
```

#### `createFiles(files: FileObject[]): Promise<void>`

Creates files at the given paths, creating parent directories as needed. Skips files that already exist.

**Usage:**

```typescript
import { createFiles } from './src/helpers';

await createFiles([
    { path: 'apps/api/main.go', content: null },
    { path: 'README.md', content: '# My Project' }
]);
```

#### `mergeJson(filePath: string, data: object): void`

Merges a JSON object into an existing JSON file at the specified path.

**Usage:**

```typescript
import { mergeJson } from './src/helpers';

mergeJson(
    'package.json',
    { dependencies: { '@baldeweg/create': '1.0.0' } }
);
```

#### `mergeYaml(filePath: string, data: object): void`

Merges a JavaScript object into an existing YAML file at the specified path.

**Usage:**

```typescript
import { mergeYaml } from './src/helpers';

mergeYaml(
    'config.yaml',
    { key: 'value' }
);
```

#### `copyTemplate(options: TemplateOptions): void`

Copies a template file to a target location with variable substitution using EJS.

**Usage:**

```typescript
import { copyTemplate } from './src/helpers';

copyTemplate({
    templateName: 'package/package.json',
    targetPath: 'package.json',
    variables: { name: 'my-package' }
});
```

#### `runCommand(options: CommandOptions): Promise<void>`

Runs a command in the repository directory.

**Usage:**

```typescript
import { runCommand } from './src/helpers';

await runCommand('pnpm', ['install']);
```

#### `makeSlug(term: string): string`

Replaces special characters in a string to create a slug suitable for filenames. It replaces `/` with `_` and removes any other non-alphanumeric characters except underscores and hyphens.

**Usage:**

```typescript
import { makeSlug } from './src/helpers';

const slug = makeSlug('my/project name'); // 'my_project_name'
```

## Template Engine

This project uses EJS for template rendering. You can use EJS syntax in your templates, including variables and logic such as if statements and loops.

Example

```js
Hello <%= name %>!
```

See the [EJS documentation](https://ejs.co/#docs) for more details.
