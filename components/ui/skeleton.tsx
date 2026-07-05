import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function SkeletonText({
  lines = 3,
  className,
  lastLineClassName,
}: {
  lines?: number
  className?: string
  lastLineClassName?: string
}) {
  return (
    <div data-slot="skeleton-text" className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3 w-full",
            i === lines - 1 && cn("w-2/3", lastLineClassName)
          )}
        />
      ))}
    </div>
  )
}

function SkeletonAvatar({
  className,
  size = "default",
}: {
  className?: string
  size?: "sm" | "default" | "lg"
}) {
  return (
    <Skeleton
      data-slot="skeleton-avatar"
      className={cn(
        "shrink-0 rounded-full",
        size === "sm" && "size-8",
        size === "default" && "size-10",
        size === "lg" && "size-14",
        className
      )}
    />
  )
}

function SkeletonButton({ className }: { className?: string }) {
  return (
    <Skeleton
      data-slot="skeleton-button"
      className={cn("h-8 w-20 rounded-lg", className)}
    />
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      data-slot="skeleton-card"
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="sm" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-2.5 w-1/4" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  )
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
}
