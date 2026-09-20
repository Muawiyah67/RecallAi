"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { BookOpen, FileText, MessagesSquare } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { documents, recentChats, subjects } from "@/lib/dummy-data"

interface SearchContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const SearchContext = React.createContext<SearchContextValue | null>(null)

export function useGlobalSearch() {
  const context = React.useContext(SearchContext)
  if (!context) {
    throw new Error("useGlobalSearch must be used within a SearchProvider")
  }
  return context
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const go = React.useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen} title="Global search">
        <CommandInput placeholder="Search subjects, documents, chats..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Subjects">
            {subjects.map((subject) => (
              <CommandItem
                key={subject.id}
                value={subject.name}
                onSelect={() => go(`/subjects/${subject.id}`)}
              >
                <BookOpen />
                {subject.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Documents">
            {documents.slice(0, 6).map((doc) => (
              <CommandItem
                key={doc.id}
                value={doc.filename}
                onSelect={() => go(`/subjects/${doc.subjectId}`)}
              >
                <FileText />
                {doc.filename}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Recent Chats">
            {recentChats.map((chat) => (
              <CommandItem
                key={chat.id}
                value={chat.title}
                onSelect={() => go(`/subjects/${chat.subjectId}`)}
              >
                <MessagesSquare />
                {chat.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </SearchContext.Provider>
  )
}
