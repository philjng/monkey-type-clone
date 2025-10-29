"use client"

import "./styles.css"

type ColoredTextProps = {
  currentInput: string
  typed: string[]
  allChars: string[]
  currentWord: string
}

export const ColoredText = ({
  currentInput,
  typed,
  allChars,
  currentWord,
}: ColoredTextProps) => {
  console.log("current input: ", currentInput)
  console.log("typed, allChars ", typed.join(""), allChars.join(""))
  const characters: React.ReactNode[] = []
  let className = ""
  let char: string
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== allChars[i]) {
      console.log("typed; wrong")
      className += "text-red-500 z-40"
    } else {
      console.log("typed; right")
      className += "text-white z-40"
    }

    characters.push(
      <span key={i} className={className}>
        {/* {char} */}
        {allChars[i]}
      </span>
    )
    className = ""
  }

  // match currently typed word
  console.log("current word: ", currentWord)
  for (let i = 0; i < currentInput.length; i++) {
    if (
      i >= currentWord.length ||
      (currentInput[i] && currentInput[i] !== currentWord[i])
    ) {
      // console.log("current; wrong")

      className += "text-red-500 z-40"
    } else {
      // console.log("current; right")

      className += "text-white z-40"
    }
    char = i >= currentWord.length ? currentInput[i] : currentWord[i]
    characters.push(
      <span key={char + i.toString()} className={className}>
        {char}
      </span>
    )
    className = ""
  }

  return <div className="typed text-5xl leading-relaxed z-40">{characters}</div>
}
