import type {
  ChatMessage,
  Document,
  Flashcard,
  Notification,
  QuizQuestion,
  RecentChat,
  StorageStats,
  StudyStreak,
  Subject,
  UserProfile,
} from "@/lib/types"

function daysAgo(days: number, hours = 0, minutes = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(d.getHours() - hours)
  d.setMinutes(d.getMinutes() - minutes)
  return d.toISOString()
}

export const currentUser: UserProfile = {
  id: "user-1",
  name: "Amara Osei",
  email: "amara.osei@example.com",
  plan: "Pro",
  joinedAt: daysAgo(214),
}

export const subjects: Subject[] = [
  {
    id: "biology",
    name: "Biology 101",
    description: "Cell structure, genetics, and evolution fundamentals",
    color: "oklch(0.577 0.15 148.5)",
    documentCount: 5,
    masteryPercent: 72,
    lastActivityAt: daysAgo(0, 2),
  },
  {
    id: "orgo",
    name: "Organic Chemistry",
    description: "Reaction mechanisms, stereochemistry, and synthesis",
    color: "oklch(0.546 0.208 277.4)",
    documentCount: 8,
    masteryPercent: 45,
    lastActivityAt: daysAgo(1),
  },
  {
    id: "calc2",
    name: "Calculus II",
    description: "Integration techniques, series, and sequences",
    color: "oklch(0.556 0.184 254.6)",
    documentCount: 4,
    masteryPercent: 88,
    lastActivityAt: daysAgo(3),
  },
  {
    id: "history",
    name: "World History",
    description: "20th century geopolitics and major conflicts",
    color: "oklch(0.6 0.17 68)",
    documentCount: 6,
    masteryPercent: 61,
    lastActivityAt: daysAgo(5),
  },
  {
    id: "econ",
    name: "Microeconomics",
    description: "Supply, demand, and market structures",
    color: "oklch(0.6 0.16 25)",
    documentCount: 3,
    masteryPercent: 34,
    lastActivityAt: daysAgo(9),
  },
  {
    id: "spanish",
    name: "Spanish Vocabulary",
    description: "Newly created subject — upload documents to get started",
    color: "oklch(0.6 0.1 340)",
    documentCount: 0,
    masteryPercent: 0,
    lastActivityAt: daysAgo(0, 1),
  },
]

export const documents: Document[] = [
  { id: "doc-1", subjectId: "biology", filename: "Chapter 3 - Cell Membranes.pdf", uploadedAt: daysAgo(0, 2), pages: 24, sizeKb: 3120, status: "ready" },
  { id: "doc-2", subjectId: "biology", filename: "Genetics Lecture Slides.pdf", uploadedAt: daysAgo(2), pages: 48, sizeKb: 5860, status: "ready" },
  { id: "doc-3", subjectId: "biology", filename: "Evolution Reading Packet.pdf", uploadedAt: daysAgo(4), pages: 16, sizeKb: 2010, status: "ready" },
  { id: "doc-4", subjectId: "biology", filename: "Mitosis vs Meiosis Notes.pdf", uploadedAt: daysAgo(0, 6), pages: 8, sizeKb: 940, status: "processing", processingStage: "embedding" },
  { id: "doc-5", subjectId: "biology", filename: "Midterm Study Guide.pdf", uploadedAt: daysAgo(6), pages: 12, sizeKb: 1500, status: "ready" },

  { id: "doc-6", subjectId: "orgo", filename: "SN1 vs SN2 Mechanisms.pdf", uploadedAt: daysAgo(1), pages: 20, sizeKb: 2440, status: "ready" },
  { id: "doc-7", subjectId: "orgo", filename: "Stereochemistry Problem Set.pdf", uploadedAt: daysAgo(1, 4), pages: 14, sizeKb: 1780, status: "ready" },
  { id: "doc-8", subjectId: "orgo", filename: "Retrosynthesis Practice.pdf", uploadedAt: daysAgo(0, 1), pages: 10, sizeKb: 1220, status: "processing", processingStage: "extracting" },
  { id: "doc-9", subjectId: "orgo", filename: "Spectroscopy Reference.pdf", uploadedAt: daysAgo(8), pages: 32, sizeKb: 4100, status: "ready" },
  { id: "doc-10", subjectId: "orgo", filename: "Aromaticity Notes.pdf", uploadedAt: daysAgo(10), pages: 9, sizeKb: 860, status: "error" },

  { id: "doc-11", subjectId: "calc2", filename: "Integration by Parts.pdf", uploadedAt: daysAgo(3), pages: 11, sizeKb: 1340, status: "ready" },
  { id: "doc-12", subjectId: "calc2", filename: "Taylor Series Notes.pdf", uploadedAt: daysAgo(3, 5), pages: 18, sizeKb: 2200, status: "ready" },
  { id: "doc-13", subjectId: "calc2", filename: "Convergence Tests Cheatsheet.pdf", uploadedAt: daysAgo(7), pages: 6, sizeKb: 640, status: "ready" },

  { id: "doc-14", subjectId: "history", filename: "Cold War Overview.pdf", uploadedAt: daysAgo(5), pages: 28, sizeKb: 3400, status: "ready" },
  { id: "doc-15", subjectId: "history", filename: "WWII Timeline.pdf", uploadedAt: daysAgo(5, 3), pages: 22, sizeKb: 2900, status: "ready" },

  { id: "doc-16", subjectId: "econ", filename: "Market Equilibrium Notes.pdf", uploadedAt: daysAgo(9), pages: 15, sizeKb: 1900, status: "ready" },
]

export const recentUploads: Document[] = [...documents]
  .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
  .slice(0, 5)

export const recentChats: RecentChat[] = [
  {
    id: "chat-1",
    subjectId: "biology",
    subjectName: "Biology 101",
    title: "Explain the sodium-potassium pump",
    lastMessage: "It moves 3 Na+ ions out and 2 K+ ions in per ATP hydrolyzed...",
    updatedAt: daysAgo(0, 2),
    messageCount: 12,
  },
  {
    id: "chat-2",
    subjectId: "orgo",
    subjectName: "Organic Chemistry",
    title: "SN1 vs SN2 rate determining step",
    lastMessage: "SN1 reactions are unimolecular in the rate-determining step...",
    updatedAt: daysAgo(1),
    messageCount: 8,
  },
  {
    id: "chat-3",
    subjectId: "calc2",
    subjectName: "Calculus II",
    title: "When does a p-series converge?",
    lastMessage: "A p-series converges when p > 1, by the integral test...",
    updatedAt: daysAgo(3),
    messageCount: 5,
  },
  {
    id: "chat-4",
    subjectId: "history",
    subjectName: "World History",
    title: "Causes of the Cuban Missile Crisis",
    lastMessage: "Tensions escalated after the failed Bay of Pigs invasion...",
    updatedAt: daysAgo(5),
    messageCount: 15,
  },
]

export const sampleChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content: "Can you explain how the sodium-potassium pump works and why it's important?",
    createdAt: daysAgo(0, 2, 5),
  },
  {
    id: "msg-2",
    role: "assistant",
    content: `The **sodium-potassium pump** (Na⁺/K⁺-ATPase) is an active transport protein embedded in the plasma membrane. Here's how it works:

1. It binds **3 Na⁺ ions** from inside the cell
2. **ATP hydrolysis** triggers a conformational change
3. The pump releases Na⁺ outside and binds **2 K⁺ ions**
4. A second conformational change releases K⁺ inside the cell

This creates and maintains the electrochemical gradient that's essential for:

| Process | Why it matters |
|---|---|
| Nerve impulses | Enables depolarization/repolarization |
| Nutrient transport | Powers secondary active transport (e.g. glucose uptake) |
| Cell volume regulation | Prevents osmotic swelling |

The net effect per cycle can be written as:

$$\\Delta G = -3\\mu_{Na^+,out} + 3\\mu_{Na^+,in} + 2\\mu_{K^+,in} - 2\\mu_{K^+,out}$$

\`\`\`python
# simplified simulation of pump stoichiometry
def pump_cycle(na_in, k_out, atp):
    na_out = na_in - 3
    k_in = k_out - 2 if k_out >= 2 else 0
    atp -= 1
    return na_out, k_in, atp
\`\`\`

This is a great example of primary active transport — it moves ions *against* their concentration gradients using energy from ATP directly.`,
    createdAt: daysAgo(0, 2, 4),
    sources: [
      { id: "src-1", documentId: "doc-1", documentName: "Chapter 3 - Cell Membranes.pdf", page: 14, confidence: 0.94 },
      { id: "src-2", documentId: "doc-2", documentName: "Genetics Lecture Slides.pdf", page: 8, confidence: 0.71 },
    ],
  },
]

export const quizQuestionBank: Record<string, QuizQuestion[]> = {
  biology: [
    { id: "q1", question: "What is the primary function of the sodium-potassium pump?", choices: ["Maintain electrochemical gradients", "Synthesize ATP", "Replicate DNA", "Break down glucose"], correctIndex: 0, explanation: "The Na+/K+ pump uses ATP to move ions against their gradients, maintaining the resting membrane potential.", difficulty: "easy" },
    { id: "q2", question: "During mitosis, sister chromatids separate during which phase?", choices: ["Prophase", "Metaphase", "Anaphase", "Telophase"], correctIndex: 2, explanation: "Anaphase is when sister chromatids are pulled apart to opposite poles of the cell.", difficulty: "easy" },
    { id: "q3", question: "Which type of RNA carries the genetic code from DNA to the ribosome?", choices: ["tRNA", "mRNA", "rRNA", "snRNA"], correctIndex: 1, explanation: "mRNA (messenger RNA) carries the transcribed genetic code from the nucleus to ribosomes for translation.", difficulty: "medium" },
    { id: "q4", question: "What is the term for two different alleles of a gene at the same locus?", choices: ["Homozygous", "Heterozygous", "Haploid", "Polyploid"], correctIndex: 1, explanation: "Heterozygous describes an organism with two different alleles for a given gene.", difficulty: "medium" },
    { id: "q5", question: "Natural selection acts most directly on an organism's:", choices: ["Genotype", "Phenotype", "Karyotype", "Genome size"], correctIndex: 1, explanation: "Natural selection acts on observable traits (phenotype), which then affects allele frequency indirectly.", difficulty: "hard" },
    { id: "q6", question: "Which organelle is responsible for producing ATP through oxidative phosphorylation?", choices: ["Golgi apparatus", "Lysosome", "Mitochondrion", "Ribosome"], correctIndex: 2, explanation: "Mitochondria house the electron transport chain and ATP synthase used in oxidative phosphorylation.", difficulty: "easy" },
    { id: "q7", question: "A cross between two heterozygous parents (Aa x Aa) yields what phenotypic ratio?", choices: ["1:1", "9:3:3:1", "3:1", "1:2:1"], correctIndex: 2, explanation: "A monohybrid cross of Aa x Aa produces a 3:1 phenotypic ratio (dominant:recessive).", difficulty: "hard" },
    { id: "q8", question: "What is the role of telomerase in cell division?", choices: ["Repairs mismatched DNA bases", "Extends telomeres to prevent chromosome shortening", "Separates sister chromatids", "Condenses chromatin"], correctIndex: 1, explanation: "Telomerase adds repetitive sequences to chromosome ends, counteracting the shortening that occurs with each replication.", difficulty: "hard" },
  ],
}

export const flashcardBank: Record<string, Flashcard[]> = {
  biology: [
    { id: "fc1", subjectId: "biology", front: "What does the sodium-potassium pump do?", back: "Moves 3 Na+ ions out and 2 K+ ions in per ATP hydrolyzed, maintaining the resting membrane potential.", difficult: false },
    { id: "fc2", subjectId: "biology", front: "Define 'heterozygous'", back: "Having two different alleles for a particular gene.", difficult: false },
    { id: "fc3", subjectId: "biology", front: "What happens during anaphase?", back: "Sister chromatids separate and move to opposite poles of the cell.", difficult: true },
    { id: "fc4", subjectId: "biology", front: "What is the function of mRNA?", back: "Carries the genetic code from DNA in the nucleus to ribosomes for protein synthesis.", difficult: false },
    { id: "fc5", subjectId: "biology", front: "What does telomerase do?", back: "Adds repetitive nucleotide sequences to the ends of chromosomes, preventing them from shortening during replication.", difficult: true },
    { id: "fc6", subjectId: "biology", front: "What organelle produces most of a cell's ATP?", back: "The mitochondrion, via oxidative phosphorylation.", difficult: false },
    { id: "fc7", subjectId: "biology", front: "What is natural selection said to act on directly?", back: "The phenotype — observable traits — which indirectly affects allele frequencies over generations.", difficult: true },
    { id: "fc8", subjectId: "biology", front: "What phenotypic ratio results from Aa x Aa?", back: "3:1 (dominant to recessive), assuming simple Mendelian dominance.", difficult: false },
  ],
}

export const notifications: Notification[] = [
  { id: "n1", title: "Embeddings ready", description: "Mitosis vs Meiosis Notes finished processing.", createdAt: daysAgo(0, 1), read: false, type: "success" },
  { id: "n2", title: "Quiz streak saved", description: "You've studied 5 days in a row. Keep it going!", createdAt: daysAgo(0, 3), read: false, type: "info" },
  { id: "n3", title: "Storage at 82%", description: "You're approaching your Pro plan storage limit.", createdAt: daysAgo(1), read: true, type: "warning" },
  { id: "n4", title: "Upload failed", description: "Aromaticity Notes.pdf could not be processed.", createdAt: daysAgo(2), read: true, type: "warning" },
  { id: "n5", title: "New study plan ready", description: "A personalized plan for Organic Chemistry was generated.", createdAt: daysAgo(4), read: true, type: "info" },
]

export const storageStats: StorageStats = {
  usedGb: 8.2,
  totalGb: 10,
  breakdown: [
    { subjectName: "Organic Chemistry", sizeGb: 3.1 },
    { subjectName: "Biology 101", sizeGb: 2.4 },
    { subjectName: "World History", sizeGb: 1.3 },
    { subjectName: "Calculus II", sizeGb: 0.9 },
    { subjectName: "Microeconomics", sizeGb: 0.5 },
  ],
}

export const studyStreak: StudyStreak = {
  currentDays: 5,
  longestDays: 21,
  lastStudiedAt: daysAgo(0, 3),
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id)
}

export function getDocumentsBySubject(subjectId: string): Document[] {
  return documents.filter((d) => d.subjectId === subjectId)
}

export function getMostActiveSubject(): Subject {
  return [...subjects]
    .filter((s) => s.documentCount > 0)
    .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())[0]
}
