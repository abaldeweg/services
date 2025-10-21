import { text } from '@clack/prompts';
import type { Profile } from '../types/types.js';
import { createDirs, createFiles, runCommand } from '../helpers/index.js';
import { makeSlug } from '../helpers/makeSlug.js';

/**
 * Creates a notebook in packages/.
 */
export const notebookProfile: Profile = {
  id: 'notebookProfile',
  name: 'Notebook',
  description: 'Creates a notebook in packages/.',
  ask: async () => {
    const name = await text({
      message: 'Whats the name of the project?',
      placeholder: 'Name',
      initialValue: 'notebook',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return 'Name must only contain letters, numbers, hyphens (-), and underscores (_).';
        }
      },
    });

    return { name };
  },
  run: async (options) => {
    createDirs([`packages/${options.name}`, `packages/${options.name}/data`, `packages/${options.name}/export`, `packages/${options.name}/lib`]);

    createFiles([{ path: `packages/${options.name}/README.md`, content: '# Notebook' }]);

    createFiles([{ path: `packages/${options.name}/notebook.ipynb`, content: null }]);

    createFiles([{
      path: `packages/${options.name}/requirements.txt`, content: 'ipywidgets==8.1.7\nmatplotlib==3.10.7\npandas == 2.3.3'
    }]);

    runCommand('python', ['-m', 'venv', '.venv'], `packages/${options.name}`);
    runCommand('.venv/bin/pip', ['install', '-r', 'requirements.txt'], `packages/${options.name}`);
    runCommand('.venv/bin/pip', ['install', 'ipykernel'], `packages/${options.name}`);
    runCommand('.venv/bin/python', ['-m', 'ipykernel', 'install', '--user', `--name=${makeSlug(options.name)}-venv`, `--display-name='${options.name} Venv'`], `packages/${options.name}`);
  }
};
