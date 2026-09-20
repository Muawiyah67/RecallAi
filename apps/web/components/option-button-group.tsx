import { cn } from "@/lib/utils"

export function OptionButtonGroup<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
            value === option.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:bg-muted"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
