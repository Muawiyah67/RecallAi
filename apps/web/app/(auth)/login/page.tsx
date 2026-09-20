import Link from "next/link"
import type { Metadata } from "next"

import { LoginForm } from "@/components/auth/login-form"
import { H1, Muted } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Log in — Recall AI",
}

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <H1>Welcome back</H1>
        <Muted>Log in to pick up where you left off.</Muted>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-foreground hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}