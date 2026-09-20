"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GlobalSearchTrigger } from "@/components/layout/global-search-trigger"
import { NotificationsMenu } from "@/components/layout/notifications-menu"
import { ProfileMenu } from "@/components/layout/profile-menu"
import { useGlobalSearch } from "@/components/layout/search-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { getSubjectById } from "@/lib/dummy-data"

interface Crumb {
  label: string
  href?: string
}

function useBreadcrumb(): Crumb[] {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments[0] === "dashboard") {
    return [{ label: "Dashboard" }]
  }

  if (segments[0] === "settings") {
    return [{ label: "Settings" }]
  }

  if (segments[0] === "subjects" && segments[1]) {
    const subject = getSubjectById(segments[1])
    const crumbs: Crumb[] = [
      { label: "Subjects", href: "/dashboard" },
      { label: subject?.name ?? "Subject", href: `/subjects/${segments[1]}` },
    ]
    if (segments[2] === "quiz") crumbs.push({ label: "Quiz" })
    if (segments[2] === "flashcards") crumbs.push({ label: "Flashcards" })
    return crumbs
  }

  return [{ label: "Recall AI" }]
}

export function AppNavbar() {
  const crumbs = useBreadcrumb()
  const { setOpen } = useGlobalSearch()

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur-sm sm:px-4">
      <SidebarTrigger />
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          {crumbs.map((crumb, index) => (
            <div key={crumb.label} className="flex items-center gap-1.5">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="hidden sm:block">
          <GlobalSearchTrigger />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          aria-label="Search"
          onClick={() => setOpen(true)}
        >
          <Search />
        </Button>
        <NotificationsMenu />
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  )
}
