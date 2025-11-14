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
  const characters: React.ReactNode[] = []
  let className = ""
  let char: string

  // matched all previously typed
  let i = 0,
    j = 0
  while (i < typed.length) {
    if (allChars[j] === " " && typed[i] !== "*") {
      className += "text-red-600 z-40"
      char = typed[i]
    } else if (typed[i] !== allChars[j]) {
      className += "text-red-500 z-40"
      char = allChars[j]
      j++
    } else {
      className += "text-white z-40"
      char = allChars[j]
      j++
    }

    characters.push(
      <span key={i} className={className}>
        {char}
      </span>
    )
    className = ""
    i++
  }

  // match currently typed word
  for (let i = 0; i < currentInput.length; i++) {
    if (
      i >= currentWord.length ||
      (currentInput[i] && currentInput[i] !== currentWord[i])
    ) {
      className += "text-red-500 z-40"
    } else {
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
