import Link from "next/link"

const showcaseCards = [
  { front: "Spaced repetition", back: "Review right before you'd forget it." },
  { front: "Active recall", back: "Testing yourself beats re-reading." },
  { front: "Interleaving", back: "Mix subjects instead of blocking them." },
]

export function AuthHeroPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-primary px-12 py-16 text-primary-foreground md:flex">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Recall AI
      </Link>

      <div className="relative flex h-64 items-center justify-center">
        {showcaseCards.map((card, i) => (
          <div
            key={card.front}
            className="absolute w-56 rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 shadow-lg backdrop-blur-sm"
            style={{
              transform: `rotate(${(i - 1) * 8}deg) translateY(${i === 1 ? -10 : 4}px)`,
              zIndex: i === 1 ? 10 : i,
            }}
          >
            <p className="text-sm font-medium leading-snug">{card.front}</p>
            <div className="my-3 h-px bg-primary-foreground/15" />
            <p className="text-sm leading-snug text-primary-foreground/70">{card.back}</p>
          </div>
        ))}
      </div>

      <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/80">
        Upload your notes and let spaced repetition do the remembering for you.
      </p>
    </div>
  )
}