import { readFileSync, writeFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { ensureDirSync } from 'fs-extra';
import type { TemplateOptions } from '../types/types.js';
import ejs from 'ejs';

/**
 * Copy a template file to target location with variable substitution.
 */
export function copyTemplate(options: TemplateOptions): void {
  const {
    templateName,
    targetPath,
    variables = {},
    templateDir = 'templates',
  } = options;

  const absTargetPath = resolve('.', targetPath);
  const templateContent = getTemplateContent(templateName, templateDir);
  const processedContent = renderEjsTemplate(templateContent, variables);
  ensureDirSync(dirname(absTargetPath));
  writeFileSync(absTargetPath, processedContent);
}

/**
 * Get template content from file system.
 */
function getTemplateContent(
  templateName: string,
  templateDir: string = 'templates',
): string {
  let templatePath: string;
  try {
    const moduleUrl = new URL('', import.meta.url);
    const currentFilePath = fileURLToPath(moduleUrl);
    const currentDir = dirname(currentFilePath);
    templatePath = join(currentDir, '..', '..', templateDir, templateName);
  } catch {
    templatePath = join(process.cwd(), templateDir, templateName);
  }
  try {
    return readFileSync(templatePath, 'utf8');
  } catch (error) {
    throw new Error(`Template file not found: ${templatePath}`);
  }
}

/**
 * Render template content using EJS for variables and logic.
 */
function renderEjsTemplate(template: string, vars: Record<string, any>): string {
  return ejs.render(template, vars);
}
