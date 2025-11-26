"use client"

import { useEffect, useReducer } from "react"
import { Quote } from "./Quote"
import "./styles.css"
import { ColoredText } from "./ColoredText"

const reducer = (state: Text, action: SetAction) => {
  if (action.type === "KEYBOARD_EVENT") {
    return next(action.payload.words, state, action.payload.event)
  }
  throw Error("Unknown action")
}

type SetAction = {
  type: "KEYBOARD_EVENT"
  payload: {
    event: KeyboardEvent
    words: string[]
  }
}

type Text = {
  wordCount: number
  currentInput: string
  typed: string[]
  untyped: string[]
  currentWord: string
}

// function put out here for the purposes of the test case for the time being
const next = (words: string[], state: Text, event: KeyboardEvent): Text => {
  const text: Text = {
    ...state,
    typed: [...state.typed],
    untyped: [...state.untyped],
  }
  if (event.key === "Backspace") {
    if (state.currentInput !== "") {
      if (state.currentInput.length <= state.currentWord.length) {
        text.untyped = [
          state.currentWord[state.currentInput.length - 1],
          ...state.untyped,
        ]
      }
      text.currentInput = state.currentInput.slice(0, -1)
    }
  } else if (event.key === " " && state.currentInput !== "") {
    if (state.currentInput.length < state.currentWord.length) {
      let filler = "*".repeat(
        state.currentWord.length - state.currentInput.length + 1
      )
      let skippedInput = (state.currentInput + filler).split("")
      text.typed = [...state.typed, ...skippedInput]
      text.untyped = state.untyped.slice(filler.length)
    } else {
      text.untyped = state.untyped.slice(1)
      let totalInput = state.currentInput + "*"
      text.typed = [...state.typed, ...totalInput.split("")]
    }
    text.currentWord = words[state.wordCount + 1]
    text.wordCount += 1

    // handle holding onto mistyped words later
    text.currentInput = ""
  }

  // match any character
  const isChar = event.key.match(/^.{1}$/) !== null && event.key !== " " // simplify this regex
  if (isChar) {
    if (state.currentInput.length < state.currentWord.length) {
      text.untyped = state.untyped.slice(1)
    }
    text.currentInput = state.currentInput + event.key
  }

  return text
}

export default function Type({ quote }: { quote: Quote }) {
  const words = quote.content.split(" ")
  const [text, dispatch] = useReducer(reducer, {
    wordCount: 0,
    currentInput: "",
    typed: [],
    untyped: quote.content.split(""),
    currentWord: words[0],
  })

  // listen for user input
  useEffect(() => {
    const handleType = (event: KeyboardEvent) => {
      // TODO: maybe I need to expand type
      dispatch({
        type: "KEYBOARD_EVENT",
        payload: { event: event, words: words },
      })
    }

    window.addEventListener("keydown", handleType)

    // clean up
    return () => {
      window.removeEventListener("keydown", handleType)
    }
  }, [])

  return (
    <div className="container">
      <ColoredText
        currentInput={text.currentInput}
        typed={text.typed}
        allChars={quote.content.split("")}
        currentWord={text.currentWord}
      />
      <div className="caret text-blue-500 text-5xl leading-relaxed">|</div>
      {text.untyped.map((char: string, i: number) => (
        <div
          key={char + i.toString()}
          className="text-gray-500 text-5xl leading-relaxed whitespace-pre"
        >
          {char}
        </div>
      ))}
      {text.wordCount}
    </div>
  )
}
