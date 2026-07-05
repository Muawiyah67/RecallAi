import { AppNavbar } from "@/components/layout/app-navbar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { SearchProvider } from "@/components/layout/search-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppNavbar />
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl p-4 pb-20 sm:p-6 md:pb-6">
              {children}
            </div>
          </div>
        </SidebarInset>
        <MobileBottomNav />
      </SidebarProvider>
    </SearchProvider>
  )
}
