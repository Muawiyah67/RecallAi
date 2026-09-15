import Link from "next/link"
import type { Metadata } from "next"

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { H1, Muted } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Reset password — Recall AI",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <H1>Reset your password</H1>
        <Muted>Enter your email and we&apos;ll send you a reset link.</Muted>
      </div>

      <ForgotPasswordForm />

      <p className="text-center text-sm text-muted-foreground">
        Remembered it after all?{" "}
        <Link href="/login" className="font-medium text-foreground hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}