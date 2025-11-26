import { describe, expect, test } from "vitest"
import { Complete, Paragraph, next, space, backspace } from "./main.js"

const quote = "Hare loses"

test("Starts empty", () => {
  const paragraph = Paragraph(quote)
  expect(paragraph.words[0].current).toBe(0)
  expect(paragraph.current).toBe(0)
})

describe("First word", () => {
  test("Typed correct letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    expect(paragraph.words[0].letters[0]).toEqual({
      expected: "H",
      match: "correct",
    })
    expect(paragraph.words[0].current).toBe(1)
    expect(paragraph.current).toBe(0)
  })

  test("Typed incorrect letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "h")
    expect(paragraph.words[0].letters[0]).toEqual({
      expected: "H",
      match: "incorrect",
    })
    expect(paragraph.words[0].current).toBe(1)
    expect(paragraph.current).toBe(0)
  })

  test("Ignore double space", () => {
    const paragraph = Paragraph(quote)
    space(paragraph)
    expect(paragraph.words[0].current).toBe(0)
    expect(paragraph.current).toBe(0)
  })

  test("Space in middle of word", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    space(paragraph)
    expect(paragraph.words[0].letters).toEqual([
      {
        expected: "H",
        match: "correct",
      },
      {
        expected: "a",
        match: "missing",
      },
      {
        expected: "r",
        match: "missing",
      },
      {
        expected: "e",
        match: "missing",
      },
    ])
    expect(paragraph.words[0].current).toBe(Complete)
    expect(paragraph.current).toBe(1)
  })

  test("Extra letters at end of word", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    next(paragraph, "s")
    expect(paragraph.words[0].extra).toBe("s")
    expect(paragraph.words[0].current).toBe(Complete)
    expect(paragraph.current).toBe(0)
  })

  test("More extra letters at end of word", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    next(paragraph, "s")
    next(paragraph, "e")
    expect(paragraph.words[0].extra).toBe("se")
    expect(paragraph.words[0].current).toBe(Complete)
    expect(paragraph.current).toBe(0)
  })
})

describe("Between words", () => {
  test("Typed space", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    expect(paragraph.words[1].current).toBe(0)
    expect(paragraph.current).toBe(1)
  })
  test("Typed double space", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    space(paragraph)
    expect(paragraph.words[1].current).toBe(0)
    expect(paragraph.current).toBe(1)
  })
})

describe("Second word", () => {
  test("Typed correct letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "l")
    expect(paragraph.current).toBe(1)
    expect(paragraph.words[1].current).toBe(1)
    expect(paragraph.words[1].letters[0]).toEqual({
      expected: "l",
      match: "correct",
    })
  })

  test("Typed incorrect letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "h")
    expect(paragraph.words[1].letters[0]).toEqual({
      expected: "l",
      match: "incorrect",
    })
    expect(paragraph.words[1].current).toBe(1)
    expect(paragraph.current).toBe(1)
  })

  test("Space in middle of word", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "l")
    space(paragraph)
    expect(paragraph.words[1].letters).toEqual([
      {
        expected: "l",
        match: "correct",
      },
      {
        expected: "o",
        match: "missing",
      },
      {
        expected: "s",
        match: "missing",
      },
      {
        expected: "e",
        match: "missing",
      },
      {
        expected: "s",
        match: "missing",
      },
    ])
    expect(paragraph.words[1].current).toBe(Complete)
    expect(paragraph.current).toBe(Complete)
  })

  test("Finish", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "l")
    next(paragraph, "o")
    next(paragraph, "s")
    next(paragraph, "e")
    next(paragraph, "s")
    expect(paragraph.words[1].current).toBe(Complete)
    expect(paragraph.current).toBe(Complete)
  })
})

describe("Backspace", () => {
  test("Ignored when empty", () => {
    const paragraph = Paragraph(quote)
    backspace(paragraph)
    expect(paragraph.words[0].current).toBe(0)
    expect(paragraph.current).toBe(0)
  })

  test("Removes correct letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    backspace(paragraph)
    expect(paragraph.words[0].letters[0].match).toBeUndefined()
    expect(paragraph.words[0].current).toBe(0)
    expect(paragraph.current).toBe(0)
  })
  test("Removes incorrect letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "h")
    backspace(paragraph)
    expect(paragraph.words[0].letters[0].match).toBeUndefined()
    expect(paragraph.words[0].current).toBe(0)
    expect(paragraph.current).toBe(0)
  })
  test("Removes extra letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    next(paragraph, "e")
    next(paragraph, "e")
    backspace(paragraph)
    expect(paragraph.words[0].extra).toBe("e")
    expect(paragraph.words[0].current).toBe(Complete)
    expect(paragraph.current).toBe(0)
  })
  test("Removes last extra letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    next(paragraph, "e")
    backspace(paragraph)
    expect(paragraph.words[0].extra).toBe("")
    expect(paragraph.words[0].current).toBe(Complete)
    expect(paragraph.current).toBe(0)
  })
  test("Uncompletes word", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    backspace(paragraph)
    expect(paragraph.words[0].letters[3].match).toBeUndefined()
    expect(paragraph.words[0].current).toBe(3)
    expect(paragraph.current).toBe(0)
  })
  test("Empties second word", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "l")
    backspace(paragraph)
    expect(paragraph.words[1].current).toBe(0)
    expect(paragraph.current).toBe(1)
  })
  test("Return to first word", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    backspace(paragraph)
    expect(paragraph.words[0].current).toBe(Complete)
    expect(paragraph.current).toBe(0)
  })
})
describe("Errors after paragraph is complete", () => {
  test("Letter", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "l")
    next(paragraph, "o")
    next(paragraph, "s")
    next(paragraph, "e")
    next(paragraph, "s")
    expect(() => next(paragraph, "s")).toThrow()
  })
  test("Space", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "l")
    next(paragraph, "o")
    next(paragraph, "s")
    next(paragraph, "e")
    next(paragraph, "s")
    expect(() => space(paragraph)).toThrow()
  })
  test("Backspace", () => {
    const paragraph = Paragraph(quote)
    next(paragraph, "H")
    next(paragraph, "a")
    next(paragraph, "r")
    next(paragraph, "e")
    space(paragraph)
    next(paragraph, "l")
    next(paragraph, "o")
    next(paragraph, "s")
    next(paragraph, "e")
    next(paragraph, "s")
    expect(() => backspace(paragraph)).toThrow()
  })
})
