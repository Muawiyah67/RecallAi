"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPasswordRequest } from "@/lib/api/auth"
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations/auth"

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(values: ForgotPasswordValues) {
    setServerError(null)
    try {
      await forgotPasswordRequest(values)
      setSent(true)
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Couldn't send the reset link. Try again."
      )
    }
  }

  if (sent) {
    return (
      <p className="rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
        If an account exists for that email, a reset link is on its way. It can take a
        minute or two to arrive.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@school.edu"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      {serverError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  )
}