"use client"

import { Check, Copy, RotateCcw, Sparkles } from "lucide-react"
import { useState } from "react"

import { MarkdownRenderer } from "@/components/chat/markdown-renderer"
import { SourceCard } from "@/components/chat/source-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { ChatMessage as ChatMessageType, Source } from "@/lib/types"

export function ChatMessage({
  message,
  isStreaming,
  isLast,
  onCopy,
  onRegenerate,
  onOpenSource,
}: {
  message: ChatMessageType
  isStreaming: boolean
  isLast: boolean
  onCopy: (content: string) => void
  onRegenerate: () => void
  onOpenSource?: (source: Source) => void
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    onCopy(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (message.role === "user") {
    return (
      <div className="ml-auto flex max-w-[85%] flex-col items-end gap-1 sm:max-w-[70%]">
        <div className="rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm whitespace-pre-wrap text-primary-foreground">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-[95%] gap-3 sm:max-w-[85%]">
      <Avatar size="sm" className="mt-0.5 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Sparkles className="size-3.5" />
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="rounded-2xl rounded-tl-md bg-muted/50 px-3.5 py-3">
          <MarkdownRenderer content={message.content} />
          {isStreaming && (
            <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-foreground/60 align-middle" />
          )}
        </div>

        {!isStreaming && message.content && (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-xs" onClick={handleCopy} aria-label="Copy message">
              {copied ? <Check /> : <Copy />}
            </Button>
            {isLast && (
              <Button variant="ghost" size="icon-xs" onClick={onRegenerate} aria-label="Regenerate response">
                <RotateCcw />
              </Button>
            )}
          </div>
        )}

        {!isStreaming && message.sources && message.sources.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Sources</span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {message.sources.map((source) => (
                <SourceCard key={source.id} source={source} onClick={onOpenSource} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
