import { getDocumentsBySubject } from "@/lib/dummy-data"
import type { Source } from "@/lib/types"

function responseTemplates(subjectName: string): string[] {
  return [
    `Here's a structured summary based on your **${subjectName}** materials:

### Overview

The core idea ties together a few related concepts you've uploaded notes on.

- **Definition** — the precise term as used in your documents
- **Why it matters** — how it connects to the broader topic
- **Common mistake** — what students often get wrong here

> Key insight: understanding the *underlying mechanism* matters more than memorizing the term itself.

Let me know if you'd like a deeper breakdown of any of these points.`,

    `Let's compare the core concepts side by side:

| Concept | Definition | Example |
|---|---|---|
| Term A | Foundational idea from your notes | Appears in chapter 1 |
| Term B | Related but distinct concept | Often confused with Term A |
| Term C | Builds on both A and B | Shows up in practice problems |

A useful way to track your progress on this is:

$$\\text{Mastery} = \\frac{\\text{Correct answers}}{\\text{Total attempts}} \\times 100$$

Want me to generate a few practice questions on this?`,

    `Here's a step-by-step approach for **${subjectName}**:

1. Review the relevant section in your uploaded notes
2. Rewrite the key definitions in your own words
3. Test recall with flashcards
4. Confirm retention with a short quiz

\`\`\`text
Suggested schedule
Day 1 — Read + highlight key terms
Day 2 — Flashcards (15 min)
Day 3 — Practice quiz (10 questions)
\`\`\`

Let me know if you'd like me to generate a quiz or a flashcard deck for this topic right now.`,
  ]
}

export function getCannedResponse(subjectId: string, subjectName: string, variant: number) {
  const templates = responseTemplates(subjectName)
  const content = templates[variant % templates.length]

  const readyDocs = getDocumentsBySubject(subjectId).filter((d) => d.status === "ready")
  const sources: Source[] = readyDocs.slice(0, 2).map((doc, index) => ({
    id: `${doc.id}-src-${variant}`,
    documentId: doc.id,
    documentName: doc.filename,
    page: Math.max(1, Math.round(((index + 1) / 3) * doc.pages)),
    confidence: 0.65 + ((variant + index) % 4) * 0.08,
  }))

  return { content, sources }
}
