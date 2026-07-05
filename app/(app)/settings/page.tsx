import { AiPreferencesSection } from "@/components/settings/ai-preferences-section"
import { AppearanceSection } from "@/components/settings/appearance-section"
import { DangerZoneSection } from "@/components/settings/danger-zone-section"
import { NotificationsSection } from "@/components/settings/notifications-section"
import { ProfileSection } from "@/components/settings/profile-section"
import { StorageSection } from "@/components/settings/storage-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { H1, Muted } from "@/components/ui/typography"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <H1>Settings</H1>
        <Muted>Manage your account, preferences, and data</Muted>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai">AI Preferences</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="max-w-xl">
          <ProfileSection />
        </TabsContent>
        <TabsContent value="appearance" className="max-w-xl">
          <AppearanceSection />
        </TabsContent>
        <TabsContent value="notifications" className="max-w-xl">
          <NotificationsSection />
        </TabsContent>
        <TabsContent value="ai" className="max-w-xl">
          <AiPreferencesSection />
        </TabsContent>
        <TabsContent value="storage" className="max-w-xl">
          <StorageSection />
        </TabsContent>
        <TabsContent value="danger" className="max-w-xl">
          <DangerZoneSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
