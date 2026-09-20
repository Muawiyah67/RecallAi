"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Muted } from "@/components/ui/typography"

export function AiPreferencesSection() {
  const [responseStyle, setResponseStyle] = React.useState("concise")
  const [alwaysShowSources, setAlwaysShowSources] = React.useState(true)
  const [confidenceThreshold, setConfidenceThreshold] = React.useState([60])

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Preferences</CardTitle>
        <CardDescription>Control how Recall AI answers your questions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
          Not connected to a backend yet — changes here won&apos;t be saved.
        </p>

        <div className="flex flex-col gap-2">
          <Label>Response style</Label>
          <Select value={responseStyle} onValueChange={setResponseStyle}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="show-sources">Always show sources</Label>
            <Muted className="text-xs">Display citations below every AI response</Muted>
          </div>
          <Switch id="show-sources" checked={alwaysShowSources} onCheckedChange={setAlwaysShowSources} />
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Minimum source confidence</Label>
            <span className="text-sm text-muted-foreground">{confidenceThreshold[0]}%</span>
          </div>
          <Slider
            value={confidenceThreshold}
            onValueChange={setConfidenceThreshold}
            min={0}
            max={100}
            step={5}
          />
          <Muted className="text-xs">Sources below this match confidence are hidden</Muted>
        </div>
      </CardContent>
    </Card>
  )
}