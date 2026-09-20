"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Muted, Small } from "@/components/ui/typography"

export function DangerZoneSection() {
  const [confirmOpen, setConfirmOpen] = React.useState<"documents" | "account" | null>(null)

  function handleConfirm() {
    if (confirmOpen === "documents") toast.success("All documents deleted (demo only)")
    if (confirmOpen === "account") toast.success("Account deleted (demo only)")
    setConfirmOpen(null)
  }

  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>These actions are irreversible</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <Small>Delete all documents</Small>
            <Muted className="text-xs">Removes every uploaded document across all subjects</Muted>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setConfirmOpen("documents")}>
            Delete
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <Small>Delete account</Small>
            <Muted className="text-xs">Permanently deletes your account and all data</Muted>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setConfirmOpen("account")}>
            Delete account
          </Button>
        </div>
      </CardContent>

      <Dialog open={confirmOpen !== null} onOpenChange={(open) => !open && setConfirmOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              {confirmOpen === "documents"
                ? "This will permanently delete all documents in every subject. This cannot be undone."
                : "This will permanently delete your account and all associated data. This cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
