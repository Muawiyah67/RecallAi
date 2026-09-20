"use client"

import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

// rehype-highlight wraps tokens in nested <span> elements, so by the time
// this component sees `children` it's an array of React elements, not the
// raw string. String(children) on that just gives "[object Object]" — this
// walks the tree and pulls out the actual text leaves instead.
function getNodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode }
    return getNodeText(props.children)
  }
  return ""
}

function CodeBlock({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const [copied, setCopied] = React.useState(false)
  const code = getNodeText(children).replace(/\n$/, "")

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group/code relative my-1 overflow-hidden rounded-lg border border-border bg-muted/40">
      <Button
        variant="ghost"
        size="icon-xs"
        className="absolute top-2 right-2 opacity-0 transition-opacity group-hover/code:opacity-100 group-focus-within/code:opacity-100"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? <Check /> : <Copy />}
      </Button>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          h1: ({ children }) => <h1 className="mt-1 text-lg font-semibold">{children}</h1>,
          h2: ({ children }) => <h2 className="mt-1 text-base font-semibold">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-1 text-sm font-semibold">{children}</h3>,
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="flex flex-col gap-1 pl-5 list-disc">{children}</ul>,
          ol: ({ children }) => <ol className="flex flex-col gap-1 pl-5 list-decimal">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-border pl-3 text-muted-foreground italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
          th: ({ children }) => <th className="px-3 py-2 font-medium">{children}</th>,
          td: ({ children }) => <td className="border-t border-border px-3 py-2">{children}</td>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                  {children}
                </code>
              )
            }
            return <CodeBlock className={className}>{children}</CodeBlock>
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}