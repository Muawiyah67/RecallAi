import Link from "next/link"
import type { Metadata } from "next"

import { SignupForm } from "@/components/auth/signup-form"
import { H1, Muted } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Sign up — Recall AI",
}

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <H1>Create your account</H1>
        <Muted>Start turning your notes into flashcards, quizzes, and answers.</Muted>
      </div>

      <SignupForm />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}