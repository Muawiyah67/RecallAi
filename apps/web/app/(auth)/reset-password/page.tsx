import { Suspense } from "react"
import type { Metadata } from "next"

import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { H1, Muted } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Set a new password — Recall AI",
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <H1>Set a new password</H1>
        <Muted>Choose something you haven&apos;t used before.</Muted>
      </div>

      {/* useSearchParams (for the reset token) needs a Suspense boundary */}
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}