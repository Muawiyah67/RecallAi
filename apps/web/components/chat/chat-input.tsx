"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = React.useState("")

  function handleSubmit() {
    if (!value.trim() || disabled) return
    onSend(value)
    setValue("")
  }

  return (
    <div className="flex items-end gap-2 border-t border-border bg-background p-3">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        placeholder="Ask a question about this subject..."
        className="max-h-40 min-h-9 flex-1 resize-none"
        rows={1}
      />
      <Button
        size="icon"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <ArrowUp />
      </Button>
    </div>
  )
}
