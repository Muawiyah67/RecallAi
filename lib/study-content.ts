import type { Subject } from "@/lib/types"

export function getSubjectSummary(subject: Subject): string {
  return `### Summary of ${subject.name}

Based on the documents you've uploaded, here are the key takeaways:

- **Core themes** span the topics covered across your ${subject.documentCount} uploaded documents
- **Current mastery** is at ${subject.masteryPercent}%, based on quiz and flashcard performance
- **Recommended focus** — revisit any concept you've marked difficult in flashcards before your next quiz

> Tip: Summaries improve as you upload more documents to this subject.`
}

export function getStudyPlan(subject: Subject): string {
  return `### 7-Day Study Plan for ${subject.name}

1. **Day 1–2** — Read through all uploaded documents, highlighting unfamiliar terms
2. **Day 3** — Chat with the AI about anything unclear from your reading
3. **Day 4** — Run through the flashcard deck once, marking difficult cards
4. **Day 5** — Re-review only the cards marked difficult
5. **Day 6** — Take a medium-difficulty quiz to check retention
6. **Day 7** — Review incorrect quiz answers and repeat flashcards for weak spots

\`\`\`text
Estimated time: 30-45 min/day
\`\`\`

This plan adapts as your mastery percentage changes.`
}
