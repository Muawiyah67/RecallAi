"use client"

import * as React from "react"
import { Bell, CheckCheck, Info, TriangleAlert, CircleCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Muted, Small } from "@/components/ui/typography"
import { notifications as initialNotifications } from "@/lib/dummy-data"
import { formatRelativeTime } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { NotificationType } from "@/lib/types"

const iconByType: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
}

const colorByType: Record<NotificationType, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
}

export function NotificationsMenu() {
  const [notifications, setNotifications] = React.useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex size-2 rounded-full bg-brand" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <Small>Notifications</Small>
          <Button
            variant="ghost"
            size="xs"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck /> Mark all read
          </Button>
        </div>
        <Separator />
        <div className="flex max-h-80 flex-col overflow-y-auto">
          {notifications.length === 0 ? (
            <Muted className="px-3 py-6 text-center">You&apos;re all caught up.</Muted>
          ) : (
            notifications.map((notification) => {
              const Icon = iconByType[notification.type]
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-2.5 border-b border-border px-3 py-2.5 last:border-0",
                    !notification.read && "bg-muted/50"
                  )}
                >
                  <Icon className={cn("mt-0.5 size-4 shrink-0", colorByType[notification.type])} />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium">{notification.title}</span>
                    <Muted>{notification.description}</Muted>
                    <Muted className="text-xs">{formatRelativeTime(notification.createdAt)}</Muted>
                  </div>
                  {!notification.read && (
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                  )}
                </div>
              )
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
