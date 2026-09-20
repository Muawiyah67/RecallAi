"use client"

import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export function AppearanceSection() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how Recall AI looks on your device</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label>Theme</Label>
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 text-sm transition-colors",
                mounted && theme === t.value
                  ? "border-primary bg-muted"
                  : "border-border hover:bg-muted/50"
              )}
            >
              <t.icon className="size-5" />
              {t.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
