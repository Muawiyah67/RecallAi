import Link from "next/link"
import { Upload, Sparkles, ListChecks, Layers } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { getMostActiveSubject } from "@/lib/dummy-data"

export function QuickActions() {
  const subject = getMostActiveSubject()

  const actions = [
    {
      label: "Upload a document",
      description: "Add new material to study",
      href: `/subjects/${subject.id}`,
      icon: Upload,
    },
    {
      label: "Ask AI a question",
      description: `Continue in ${subject.name}`,
      href: `/subjects/${subject.id}`,
      icon: Sparkles,
    },
    {
      label: "Take a quiz",
      description: `Test yourself on ${subject.name}`,
      href: `/subjects/${subject.id}/quiz`,
      icon: ListChecks,
    },
    {
      label: "Study flashcards",
      description: "Review with spaced repetition",
      href: `/subjects/${subject.id}/flashcards`,
      icon: Layers,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link key={action.label} href={action.href}>
          <Card variant="interactive" className="h-full">
            <CardContent className="flex flex-col gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <action.icon className="size-4.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{action.label}</span>
                <span className="text-xs text-muted-foreground">{action.description}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
