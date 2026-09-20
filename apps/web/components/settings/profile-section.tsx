"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { currentUser } from "@/lib/dummy-data"
import { getInitials } from "@/lib/format"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
})

type ProfileValues = z.infer<typeof profileSchema>

export function ProfileSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: currentUser.name, email: currentUser.email },
  })

  // TODO: replace with a real PATCH /users/me call once the NestJS API exists.
  function onSubmit(_values: ProfileValues) {
    toast.warning("Not connected to a backend yet — this wasn't actually saved.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => toast.warning("Photo upload isn't wired up yet.")}
            >
              Change photo
            </Button>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
              <FieldError errors={errors.name ? [errors.name] : undefined} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
              <FieldDescription>Used for sign-in and notifications</FieldDescription>
              <FieldError errors={errors.email ? [errors.email] : undefined} />
            </Field>
          </FieldGroup>

          <Button type="submit" className="w-fit">
            Save changes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}