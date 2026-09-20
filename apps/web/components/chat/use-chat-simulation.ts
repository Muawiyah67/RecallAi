"use client"

import * as React from "react"
import { toast } from "sonner"

import { getCannedResponse } from "@/lib/chat-responses"
import type { ChatMessage } from "@/lib/types"

const STREAM_CHARS_PER_TICK = 4
const STREAM_TICK_MS = 18

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

export function useChatSimulation(
  subjectId: string,
  subjectName: string,
  initialMessages: ChatMessage[] = []
) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages)
  const [streamingId, setStreamingId] = React.useState<string | null>(null)
  const [isThinking, setIsThinking] = React.useState(false)
  const variantRef = React.useRef(0)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const streamAssistantReply = React.useCallback(() => {
    const { content, sources } = getCannedResponse(subjectId, subjectName, variantRef.current)
    variantRef.current += 1

    const assistantId = makeId()
    setIsThinking(true)

    window.setTimeout(() => {
      setIsThinking(false)
      setStreamingId(assistantId)
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", createdAt: new Date().toISOString() },
      ])

      let index = 0
      intervalRef.current = setInterval(() => {
        index += STREAM_CHARS_PER_TICK
        const chunk = content.slice(0, index)
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: chunk } : m))
        )
        if (index >= content.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content, sources } : m))
          )
          setStreamingId(null)
        }
      }, STREAM_TICK_MS)
    }, 500)
  }, [subjectId, subjectName])

  const sendMessage = React.useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isThinking || streamingId) return

      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "user", content: trimmed, createdAt: new Date().toISOString() },
      ])
      streamAssistantReply()
    },
    [isThinking, streamingId, streamAssistantReply]
  )

  const regenerate = React.useCallback(() => {
    if (isThinking || streamingId) return
    setMessages((prev) => {
      const lastAssistantIndex = [...prev].reverse().findIndex((m) => m.role === "assistant")
      if (lastAssistantIndex === -1) return prev
      const index = prev.length - 1 - lastAssistantIndex
      return prev.slice(0, index)
    })
    streamAssistantReply()
  }, [isThinking, streamingId, streamAssistantReply])

  const copyMessage = React.useCallback((content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard")
  }, [])

  const isLastMessageStreamingOrThinking = isThinking || streamingId !== null

  return {
    messages,
    isThinking,
    streamingId,
    isBusy: isLastMessageStreamingOrThinking,
    sendMessage,
    regenerate,
    copyMessage,
  }
}
