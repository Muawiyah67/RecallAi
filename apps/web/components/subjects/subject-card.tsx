"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileStack, Upload } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import { Muted, Small } from "@/components/ui/typography"
import { formatRelativeTime } from "@/lib/format"
import type { Subject } from "@/lib/types"

export function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/subjects/${subject.id}`}>
        <Card variant="interactive" className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: subject.color }}
                aria-hidden
              />
              <CardTitle>{subject.name}</CardTitle>
            </div>
            <CardDescription className="line-clamp-2">{subject.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {subject.documentCount === 0 ? (
              <Empty className="gap-2 border-0 p-0 text-left">
                <EmptyMedia variant="icon" className="mb-0 size-8">
                  <Upload className="size-4" />
                </EmptyMedia>
                <div className="flex flex-col gap-0.5">
                  <EmptyTitle className="text-xs">No documents yet</EmptyTitle>
                  <EmptyDescription className="text-xs">Upload your first file to get started</EmptyDescription>
                </div>
              </Empty>
            ) : (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <Small className="flex items-center gap-1.5 font-normal text-muted-foreground">
                    <FileStack className="size-3.5" />
                    {subject.documentCount} documents
                  </Small>
                  <Small className="font-medium">{subject.masteryPercent}% mastery</Small>
                </div>
                <Progress value={subject.masteryPercent} />
                <Muted className="text-xs">Active {formatRelativeTime(subject.lastActivityAt)}</Muted>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
