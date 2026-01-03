import { text } from "@clack/prompts"
import { createDirs, createFiles, runCommand } from "../helpers/index.js"
import { makeSlug } from "../helpers/makeSlug.js"
import type { Profile } from "../types/types.js"

/**
 * Creates a notebook in notebooks/.
 */
export const notebookProfile: Profile = {
  id: "notebookProfile",
  name: "Notebook",
  description: "Creates a notebook.",
  ask: async () => {
    const name = await text({
      message: "What's the name of the project?",
      placeholder: "Name",
      initialValue: "notebook",
      validate(value) {
        if (value.length === 0) return `Value is required!`
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return "Name must only contain letters, numbers, hyphens (-), and underscores (_)."
        }
      },
    })

    return { name }
  },
  run: async (options) => {
    await createDirs([
      `notebooks/${options.name}`,
      `notebooks/${options.name}/data`,
      `notebooks/${options.name}/export`,
      `notebooks/${options.name}/lib`,
    ])

    await createFiles([
      { path: `notebooks/${options.name}/README.md`, content: "# Notebook" },
    ])

    await createFiles([
      { path: `notebooks/${options.name}/notebook.ipynb`, content: null },
    ])

    await createFiles([
      {
        path: `notebooks/${options.name}/requirements.txt`,
        content: "ipywidgets==8.1.7\nmatplotlib==3.10.7\npandas == 2.3.3",
      },
    ])

    await runCommand(
      "python",
      ["-m", "venv", ".venv"],
      `notebooks/${options.name}`,
    )
    await runCommand(
      ".venv/bin/pip",
      ["install", "-r", "requirements.txt"],
      `notebooks/${options.name}`,
    )
    await runCommand(
      ".venv/bin/pip",
      ["install", "ipykernel"],
      `notebooks/${options.name}`,
    )
    await runCommand(
      ".venv/bin/python",
      [
        "-m",
        "ipykernel",
        "install",
        "--user",
        `--name=${makeSlug(String(options.name))}-venv`,
        `--display-name='${String(options.name)} Venv'`,
      ],
      `notebooks/${String(options.name)}`,
    )
  },
}
