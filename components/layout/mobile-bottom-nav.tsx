"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Search, Settings, BookOpen } from "lucide-react"

import { useGlobalSearch } from "@/components/layout/search-provider"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Subjects", href: "/subjects", icon: BookOpen },
  { label: "Settings", href: "/settings", icon: Settings },
] as const

export function MobileBottomNav() {
  const pathname = usePathname()
  const { setOpen } = useGlobalSearch()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t border-border bg-background/95 backdrop-blur-sm md:hidden">
      {navItems.slice(0, 2).map((item) => {
        const active = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-1.5 text-muted-foreground",
              active && "text-foreground"
            )}
          >
            <item.icon className="size-5" />
            <span className="text-[11px] font-medium">{item.label}</span>
          </Link>
        )
      })}
      <button
        onClick={() => setOpen(true)}
        className="flex flex-1 flex-col items-center gap-0.5 py-1.5 text-muted-foreground"
      >
        <Search className="size-5" />
        <span className="text-[11px] font-medium">Search</span>
      </button>
      {navItems.slice(2).map((item) => {
        const active = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-1.5 text-muted-foreground",
              active && "text-foreground"
            )}
          >
            <item.icon className="size-5" />
            <span className="text-[11px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
