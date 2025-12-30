import { spawn } from "child_process"
import { resolve } from "path"
import { log } from "@clack/prompts"

/**
 * Runs a command asynchronously.
 */
export async function runCommand(
  command: string,
  args: string[] = [],
  workingDir: string = ".",
): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(command, args, {
      cwd: resolve(workingDir),
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
    })

    let stdout = ""
    let stderr = ""

    proc.stdout?.on("data", (chunk: Buffer | string) => {
      stdout += String(chunk)
    })

    proc.stderr?.on("data", (chunk: Buffer | string) => {
      stderr += String(chunk)
    })

    proc.on("error", (err) => {
      if (stderr) log.error(stderr.trim())
      reject(new Error(`Failed to start command "${command}": ${err.message}`))
    })

    proc.on("close", (code) => {
      if (stdout) log.info(stdout.trim())
      if (stderr) log.error(stderr.trim())
      if (code !== 0) {
        reject(new Error(`Command "${command}" failed with exit code ${code}`))
      } else {
        resolvePromise()
      }
    })
  })
}
