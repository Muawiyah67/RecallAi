import Link from "next/link"
import type { ReactNode } from "react"

import { AuthHeroPanel } from "@/components/auth/auth-hero-panel"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <AuthHeroPanel />
      <div className="flex flex-col gap-10 px-6 py-12 md:items-center md:justify-center md:py-16">
        <Link href="/" className="text-lg font-semibold tracking-tight md:hidden">
          Recall AI
        </Link>
        <div className="w-full max-w-sm md:mx-auto">{children}</div>
      </div>
    </div>
  )
}