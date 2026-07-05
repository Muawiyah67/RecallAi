const SENTENCE_BANK = [
  "The central concept introduced in this section builds directly on the previous chapter's foundations.",
  "Note the distinction between the two mechanisms described here — they are often confused on exams.",
  "This diagram illustrates the process step by step, from initial state to equilibrium.",
  "Key terminology is defined in bold; make sure to review each definition before the next lecture.",
  "A worked example follows, demonstrating how to apply the formula introduced above.",
  "Common misconceptions about this topic are addressed in the callout box on the right.",
  "The relationship between these two variables is not always linear, as shown in the accompanying chart.",
  "Review questions at the end of this section test recall of the material covered here.",
  "Historical context is provided to help frame why this concept became significant.",
  "This table summarizes the main differences discussed across the last three sections.",
  "The following passage has been referenced frequently in past exam questions.",
  "Pay close attention to the exceptions listed here, as they are frequently tested.",
]

export function getPageParagraphs(pageNumber: number): string[] {
  const start = (pageNumber - 1) % SENTENCE_BANK.length
  return [
    SENTENCE_BANK[start],
    SENTENCE_BANK[(start + 1) % SENTENCE_BANK.length],
    SENTENCE_BANK[(start + 2) % SENTENCE_BANK.length],
  ]
}

export function pageContainsQuery(pageNumber: number, query: string): boolean {
  if (!query.trim()) return false
  const text = getPageParagraphs(pageNumber).join(" ").toLowerCase()
  return text.includes(query.trim().toLowerCase())
}
