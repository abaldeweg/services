import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import ejs from "ejs";
import { log } from "@clack/prompts";
import { getSourcePath, getTargetPath } from "./utils.js";

/**
 * Copies a template file to target location with variable substitution.
 */
export function copyTemplate(
  templateName: string,
  targetPath: string,
  variables: Record<string, any> = {}
): void {
  const absTemplatePath: string = getSourcePath(templateName);
  const absTargetPath = getTargetPath(targetPath);
  const parentDir = dirname(absTargetPath);

  if (existsSync(absTargetPath)) {
    log.warn(`File already exists, skipping: ${targetPath}`);
    return;
  }

  let templateContent: string;
  try {
    templateContent = readFileSync(absTemplatePath, "utf8");
  } catch (error) {
    throw new Error(`Template file not found: ${absTemplatePath}`);
  }

  const renderedContent = ejs.render(templateContent, variables);

  mkdirSync(parentDir, { recursive: true });
  writeFileSync(absTargetPath, renderedContent);
}
