import Type from "./type"
import "./styles.css"
import { DEFAULT_QUOTE } from "./Quote"

const API_URL = "https://api.quotable.io/quotes/random"
// const RETRIES = 5

// const fetchRetry = async () => {
//   let quote
//   let count = 1
//   while (count <= RETRIES) {
//     try {
//       let response = await fetch(API_URL)
//       let quotes = await response.json()
//       quote = quotes[0]
//     } catch (error) {
//       console.log(`Retrying fetch ${count} times`)
//       if (count === RETRIES)
//         throw new Error("Too many retries, loading default quote")
//     }
//     count++
//   }
//   return quote
// }

export default async function Main() {
  let quote
  try {
    let response = await fetch(API_URL)
    let quotes = await response.json()
    quote = quotes[0]
  } catch (error) {
    console.log("Error fetching quote: ", error)
    quote = DEFAULT_QUOTE
    // try {
    // quote = fetchRetry()
    // } catch (error) {
    // quote = DEFAULT_QUOTE
    // }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {quote ? (
        <Type quote={quote} />
      ) : (
        <div className="text-gray-400 text-5xl leading-relaxed animate-pulse">
          Fetching quote...
        </div>
      )}
      {/* <p className="text text-gray-500 text-5xl leading-relaxed"> */}
      {/* {quote.content} */}
      {/* </p> */}
    </div>
  )
}
