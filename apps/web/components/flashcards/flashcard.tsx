"use client"

import { motion } from "framer-motion"

import type { Flashcard as FlashcardType } from "@/lib/types"

export function Flashcard({
  card,
  flipped,
  onFlip,
}: {
  card: FlashcardType
  flipped: boolean
  onFlip: () => void
}) {
  return (
    <div className="[perspective:1200px]" onClick={onFlip}>
      <motion.div
        className="relative h-64 w-full cursor-pointer sm:h-72"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-card p-6 text-center ring-1 ring-foreground/10 [backface-visibility:hidden]"
        >
          <p className="text-lg font-medium">{card.front}</p>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary p-6 text-center text-primary-foreground ring-1 ring-foreground/10 [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-base leading-relaxed">{card.back}</p>
        </div>
      </motion.div>
    </div>
  )
}
