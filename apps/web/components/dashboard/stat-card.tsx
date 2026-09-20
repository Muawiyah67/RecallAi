import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  iconClassName?: string
}

export function StatCard({ label, value, hint, icon: Icon, iconClassName }: StatCardProps) {
  return (
    <Card variant="interactive">
      <CardContent className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-2xl font-semibold tracking-tight">{value}</span>
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </div>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground",
            iconClassName
          )}
        >
          <Icon className="size-4.5" />
        </div>
      </CardContent>
    </Card>
  )
}
