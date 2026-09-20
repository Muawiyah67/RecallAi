"use client"

import * as React from "react"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessage } from "@/components/chat/chat-message"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { useChatSimulation } from "@/components/chat/use-chat-simulation"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { ChatMessage as ChatMessageType, Source } from "@/lib/types"
import { Info, Sparkles } from "lucide-react"

export function ChatThread({
  subjectId,
  subjectName,
  initialMessages,
  onOpenSource,
}: {
  subjectId: string
  subjectName: string
  initialMessages?: ChatMessageType[]
  onOpenSource?: (source: Source) => void
}) {
  const { messages, isThinking, streamingId, isBusy, sendMessage, regenerate, copyMessage } =
    useChatSimulation(subjectId, subjectName, initialMessages)

  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isThinking])

  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant")?.id

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col gap-5 p-4">
          {messages.length === 0 ? (
            <Empty className="mt-8">
              <EmptyMedia variant="icon">
                <Sparkles />
              </EmptyMedia>
              <EmptyTitle>Ask anything about {subjectName}</EmptyTitle>
              <EmptyDescription>
                I can explain concepts, summarize documents, and cite the exact page they came from.
              </EmptyDescription>
            </Empty>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isStreaming={streamingId === message.id}
                isLast={message.id === lastAssistantId}
                onCopy={copyMessage}
                onRegenerate={regenerate}
                onOpenSource={onOpenSource}
              />
            ))
          )}
          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
              </div>
              <TypingIndicator />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 border-t border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
        <Info className="size-3 shrink-0" />
        Simulated responses — not connected to a real AI backend yet
      </div>

      <ChatInput onSend={sendMessage} disabled={isBusy} />
    </div>
  )
}