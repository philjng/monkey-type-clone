export interface Quote {
  _id: string
  // The quotation text
  content: string
  // The full name of the author
  author: string
  // The `slug` of the quote author
  authorSlug: string
  // The length of quote (number of characters)
  length: number
  // An array of tag name
  tags: string[]
}

export const DEFAULT_QUOTE = {
  _id: "1",
  content:
    "Maybe there's only a dark road ahead. But you still have to believe and keep going. Believe that the stars will light your path, even a little bit.",
  author: "Kaori Miyazono",
  authorSlug: "KaoriMiyazono",
  length: 147,
  tags: [],
}
