import { log } from "@clack/prompts"
import { describe, it, expect, vi, afterEach } from "vitest"
import { runCommand } from "./runCommand.js"

describe("runCommand", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("resolves when a command writes to stdout and exits 0", async () => {
    const infoSpy = vi.spyOn(log, "info")
    await expect(
      runCommand("node", ["-e", 'console.log("ok")']),
    ).resolves.toBeUndefined()
    expect(infoSpy).toHaveBeenCalledWith("ok")
  })

  it("rejects when a command exits with non-zero code", async () => {
    await expect(runCommand("node", ["-e", "process.exit(5)"])).rejects.toThrow(
      /failed with exit code 5|exit code 5/i,
    )
  })

  it("rejects when the command cannot be started", async () => {
    const cmd = "no-such-cmd-abcdef"
    await expect(runCommand(cmd)).rejects.toThrow(
      new RegExp(`Failed to start command "${cmd}"`),
    )
  })
})
