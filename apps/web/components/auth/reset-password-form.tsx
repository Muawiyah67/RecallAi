"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import { resetPasswordRequest } from "@/lib/api/auth"
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validations/auth"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  async function onSubmit(values: ResetPasswordValues) {
    if (!token) {
      setServerError("This reset link is invalid or has expired. Request a new one.")
      return
    }

    setServerError(null)
    try {
      await resetPasswordRequest(values, token)
      router.push("/login")
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Couldn't reset your password. Try again."
      )
    }
  }

  if (!token) {
    return (
      <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
        This reset link is invalid or has expired.{" "}
        <a href="/forgot-password" className="font-medium underline">
          Request a new one
        </a>
        .
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New password</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Resetting..." : "Reset password"}
      </Button>
    </form>
  )
}