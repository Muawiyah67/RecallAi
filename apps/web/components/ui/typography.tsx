import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva("font-heading text-balance tracking-tight", {
  variants: {
    level: {
      h1: "text-3xl font-semibold sm:text-4xl",
      h2: "text-2xl font-semibold sm:text-3xl",
      h3: "text-xl font-semibold",
      h4: "text-lg font-medium",
    },
  },
  defaultVariants: {
    level: "h1",
  },
})

type HeadingProps = React.ComponentProps<"h1"> &
  VariantProps<typeof headingVariants>

function createHeading(tag: "h1" | "h2" | "h3" | "h4") {
  function Heading({ className, level = tag, ...props }: HeadingProps) {
    const Comp = tag
    return (
      <Comp
        data-slot={tag}
        className={cn(headingVariants({ level }), className)}
        {...props}
      />
    )
  }
  Heading.displayName = tag.toUpperCase()
  return Heading
}

const H1 = createHeading("h1")
const H2 = createHeading("h2")
const H3 = createHeading("h3")
const H4 = createHeading("h4")

function P({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="p"
      className={cn("text-sm leading-relaxed text-foreground", className)}
      {...props}
    />
  )
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="lead"
      className={cn("text-lg leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function Large({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="large"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function Small({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="small"
      className={cn("text-xs leading-none font-medium", className)}
      {...props}
    />
  )
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="muted"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="inline-code"
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs font-medium",
        className
      )}
      {...props}
    />
  )
}

function Blockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="blockquote"
      className={cn(
        "border-l-2 border-border pl-4 text-sm italic text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode, Blockquote }
