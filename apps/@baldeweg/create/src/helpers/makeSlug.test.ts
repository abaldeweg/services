import { describe, it, expect } from "vitest"
import { makeSlug } from "./makeSlug.js"

describe("makeSlug", () => {
  it("produces expected slugs for various inputs", () => {
    const cases: Array<[string, string]> = [
      ["abc123", "abc123"],
      ["a/b/c", "a_b_c"],
      ["a!b@c#d$e%f^&g*()", "abcdefg"],
      ["keep_this-and-that", "keep_this-and-that"],
      ["test test", "testtest"],
      ["a/b?c#d", "a_bcd"],
      ["", ""],
    ]

    for (const [input, expected] of cases) {
      expect(makeSlug(input)).toBe(expected)
    }
  })
})
