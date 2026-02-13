import { readFile, writeFile, mkdir } from "fs/promises"
import { dirname } from "path"
import { log } from "@clack/prompts"
import ejs from "ejs"
import { getSourcePath, getTargetPath } from "./utils.js"

/**
 * Copies a template file to target location with variable substitution.
 */
export async function copyTemplate(
  templateName: string,
  targetPath: string,
  variables: Record<string, unknown> = {},
): Promise<void> {
  const absTemplatePath: string = getSourcePath(templateName)
  const absTargetPath = getTargetPath(targetPath)
  const parentDir = dirname(absTargetPath)

  await mkdir(parentDir, { recursive: true })

  let templateContent: string
  try {
    templateContent = await readFile(absTemplatePath, "utf8")
  } catch (error) {
    throw new Error(`Error reading template file ${absTemplatePath}`, {
      cause: error as unknown,
    })
  }

  const renderedContent = ejs.render(templateContent, variables)
  try {
    await writeFile(absTargetPath, renderedContent, {
      encoding: "utf8",
      flag: "wx",
    })
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === "EEXIST"
    ) {
      log.warn(`File exists, skipping: ${absTargetPath}`)
      return
    }
    throw new Error(`Error writing file to ${absTargetPath}`, {
      cause: error,
    })
  }
}
