import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { log } from '@clack/prompts';

/**
 * Runs a command.
 */
export function runCommand(command: string, args: string[] = [], workingDir: string = '.'): void {
  const result = spawnSync(command, args, {
    cwd: resolve(workingDir),
    shell: false,
    encoding: 'utf-8',
  });

  if (result.stdout) {
    log.info(String(result.stdout).trim());
  }
  if (result.stderr) {
    log.error(String(result.stderr).trim());
  }
  if (result.error) {
    throw new Error(`Failed to start command "${command}": ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`Command "${command}" failed with exit code ${result.status}`);
  }
}
