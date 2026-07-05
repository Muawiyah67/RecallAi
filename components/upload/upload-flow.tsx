"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, CheckCircle2, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Muted } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

type Phase = "uploading" | "extracting" | "embedding"
type Step = "choose" | Phase | "ready"

const PHASES: { key: Phase; label: string; duration: number }[] = [
  { key: "uploading", label: "Uploading file", duration: 1300 },
  { key: "extracting", label: "Extracting text", duration: 1200 },
  { key: "embedding", label: "Creating embeddings", duration: 1400 },
]

interface UploadFlowProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subjectName: string
  onComplete?: (filename: string) => void
}

export function UploadFlow({ open, onOpenChange, subjectName, onComplete }: UploadFlowProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>Add study material to {subjectName}</DialogDescription>
        </DialogHeader>
        <UploadFlowBody onOpenChange={onOpenChange} onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  )
}

function UploadFlowBody({
  onOpenChange,
  onComplete,
}: {
  onOpenChange: (open: boolean) => void
  onComplete?: (filename: string) => void
}) {
  const [step, setStep] = React.useState<Step>("choose")
  const [fileName, setFileName] = React.useState<string | null>(null)
  const [phaseProgress, setPhaseProgress] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function beginUpload(name: string) {
    setFileName(name)
    setStep("uploading")
    setPhaseProgress(0)
  }

  // Ticks progress upward while a phase is active.
  React.useEffect(() => {
    const phase = PHASES.find((p) => p.key === step)
    if (!phase) return

    const tickMs = 30
    const increment = 100 / (phase.duration / tickMs)
    const interval = setInterval(() => {
      setPhaseProgress((prev) => Math.min(100, prev + increment))
    }, tickMs)

    return () => clearInterval(interval)
  }, [step])

  // Advances to the next phase once the current one completes.
  React.useEffect(() => {
    if (phaseProgress < 100) return
    const currentIndex = PHASES.findIndex((p) => p.key === step)
    if (currentIndex === -1) return

    const timeout = setTimeout(() => {
      const next = PHASES[currentIndex + 1]
      if (next) {
        setStep(next.key)
        setPhaseProgress(0)
      } else {
        setStep("ready")
        if (fileName) onComplete?.(fileName)
      }
    }, 350)

    return () => clearTimeout(timeout)
  }, [phaseProgress, step, fileName, onComplete])

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (file) beginUpload(file.name)
  }

  return (
    <div className="flex min-h-64 flex-col justify-center">
      <AnimatePresence mode="wait">
        {step === "choose" && (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                handleFiles(e.dataTransfer.files)
              }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-10 text-center transition-colors",
                isDragging && "border-primary bg-muted/50"
              )}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Upload className="size-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Drag &amp; drop a file here</span>
                <Muted className="text-xs">or click to browse (PDF, DOCX, TXT)</Muted>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
              >
                Browse files
              </Button>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          </motion.div>
        )}

        {step !== "choose" && step !== "ready" && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5 px-1"
          >
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <FileText className="size-4 text-muted-foreground" />
              <span className="truncate">{fileName}</span>
            </div>
            <div className="flex flex-col gap-4">
              {PHASES.map((phase) => {
                const isDone =
                  PHASES.findIndex((p) => p.key === phase.key) <
                  PHASES.findIndex((p) => p.key === step)
                const isActive = phase.key === step
                return (
                  <div key={phase.key} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      {isDone ? (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex size-4 items-center justify-center rounded-full bg-success text-success-foreground"
                        >
                          <Check className="size-3" />
                        </motion.div>
                      ) : (
                        <div
                          className={cn(
                            "size-4 rounded-full border-2",
                            isActive ? "border-primary" : "border-border"
                          )}
                        />
                      )}
                      <span className={cn(!isActive && !isDone && "text-muted-foreground")}>
                        {phase.label}
                      </span>
                    </div>
                    {isActive && <Progress value={phaseProgress} className="h-1.5" />}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {step === "ready" && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-3 py-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success"
            >
              <CheckCircle2 className="size-7" />
            </motion.div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">{fileName} is ready</span>
              <Muted className="text-xs">Text extracted and embeddings created successfully.</Muted>
            </div>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setStep("choose")}>
                Upload another
              </Button>
              <Button size="sm" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
