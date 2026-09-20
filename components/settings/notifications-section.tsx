"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Muted } from "@/components/ui/typography"

const OPTIONS = [
  { key: "email", label: "Email notifications", description: "Get emailed about important account activity", defaultChecked: true },
  { key: "push", label: "Push notifications", description: "Receive alerts when documents finish processing", defaultChecked: true },
  { key: "digest", label: "Weekly digest", description: "A summary of your study progress every Monday", defaultChecked: false },
  { key: "reminders", label: "Quiz reminders", description: "Nudges to keep your study streak going", defaultChecked: true },
] as const

export function NotificationsSection() {
  const [values, setValues] = React.useState<Record<string, boolean>>(
    Object.fromEntries(OPTIONS.map((o) => [o.key, o.defaultChecked]))
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
          Not connected to a backend yet — changes here won&apos;t be saved.
        </p>

        {OPTIONS.map((option, i) => (
          <React.Fragment key={option.key}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <Label htmlFor={option.key}>{option.label}</Label>
                <Muted className="text-xs">{option.description}</Muted>
              </div>
              <Switch
                id={option.key}
                checked={values[option.key]}
                onCheckedChange={(checked) => setValues((prev) => ({ ...prev, [option.key]: checked }))}
              />
            </div>
            {i < OPTIONS.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  )
}