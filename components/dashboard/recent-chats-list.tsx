import Link from "next/link"
import { MessagesSquare } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { recentChats } from "@/lib/dummy-data"
import { formatRelativeTime } from "@/lib/format"

export function RecentChatsList() {
  if (recentChats.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <MessagesSquare />
        </EmptyMedia>
        <EmptyTitle>No conversations yet</EmptyTitle>
        <EmptyDescription>Start a chat with any subject to see it here.</EmptyDescription>
      </Empty>
    )
  }

  return (
    <ItemGroup>
      {recentChats.map((chat) => (
        <Item key={chat.id} variant="outline" asChild>
          <Link href={`/subjects/${chat.subjectId}`}>
            <ItemMedia variant="icon">
              <MessagesSquare />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{chat.title}</ItemTitle>
              <ItemDescription>
                {chat.subjectName} · {chat.lastMessage}
              </ItemDescription>
            </ItemContent>
            <div className="flex flex-col items-end gap-1">
              <Badge variant="outline">{chat.messageCount} msgs</Badge>
              <span className="text-xs text-muted-foreground">{formatRelativeTime(chat.updatedAt)}</span>
            </div>
          </Link>
        </Item>
      ))}
    </ItemGroup>
  )
}
