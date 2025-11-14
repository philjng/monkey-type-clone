"use client"

import { useEffect, useState } from "react"
import { Quote } from "./Quote"
import "./styles.css"
import { ColoredText } from "./ColoredText"

export default function Type({ quote }: { quote: Quote }) {
  const words = quote.content.split(" ")
  const [wordCount, setWordCount] = useState(0)
  const [currentInput, setCurrentInput] = useState("")
  const [typed, setTyped] = useState<string[]>([])
  const [untyped, setUntyped] = useState(quote.content.split(""))
  const [currentWord, setCurrentWord] = useState(words[wordCount])

  // listen for user input
  useEffect(() => {
    const handleType = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        if (currentInput !== "") {
          if (currentInput.length <= currentWord.length) {
            setUntyped((prev) => [
              currentWord[currentInput.length - 1],
              ...prev,
            ])
          }
          setCurrentInput((prev) => prev.slice(0, -1))
        }
      } else if (event.key === " " && currentInput !== "") {
        if (currentInput.length < currentWord.length) {
          let filler = "*".repeat(currentWord.length - currentInput.length + 1)
          let skippedInput = (currentInput + filler).split("")
          skippedInput.map((char) => {
            setTyped((prev) => [...prev, char])
          })
          setUntyped((prev) => prev.slice(filler.length))
        } else {
          setUntyped((prev) => prev.slice(1))
          let totalInput = currentInput + "*"
          totalInput.split("").map((char) => {
            setTyped((prev) => [...prev, char])
          })
        }
        setCurrentWord(words[wordCount + 1])
        setWordCount((prev) => prev + 1)

        // handle holding onto mistyped words later
        setCurrentInput("")
      }

      // match any character
      const isChar = event.key.match(/^.{1}$/) !== null && event.key !== " " // simplify this regex
      if (isChar) {
        if (currentInput.length < currentWord.length) {
          setUntyped((prev) => [...prev.slice(1)])
        }
        setCurrentInput((prev) => prev + event.key)
      }
    }

    window.addEventListener("keydown", handleType)

    // clean up
    return () => {
      window.removeEventListener("keydown", handleType)
    }
  }, [currentInput, typed, wordCount, untyped])

  return (
    <div className="container">
      <ColoredText
        currentInput={currentInput}
        typed={typed}
        allChars={quote.content.split("")}
        currentWord={currentWord}
      />
      <div className="caret text-blue-500 text-5xl leading-relaxed">|</div>
      {untyped.map((char, i) => (
        <div
          key={char + i.toString()}
          className="text-gray-500 text-5xl leading-relaxed whitespace-pre"
        >
          {char}
        </div>
      ))}
      {wordCount}
    </div>
  )
}
