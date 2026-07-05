import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Muted, Small } from "@/components/ui/typography"
import { storageStats } from "@/lib/dummy-data"

export function StorageSection() {
  const percentUsed = Math.round((storageStats.usedGb / storageStats.totalGb) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>
          {storageStats.usedGb} GB of {storageStats.totalGb} GB used
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Progress value={percentUsed} />
          <div className="flex items-center justify-between">
            <Muted className="text-xs">{percentUsed}% used</Muted>
            <Button variant="outline" size="sm">
              Upgrade plan
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Small>Breakdown by subject</Small>
          {storageStats.breakdown.map((entry) => (
            <div key={entry.subjectName} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{entry.subjectName}</span>
              <span>{entry.sizeGb} GB</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
