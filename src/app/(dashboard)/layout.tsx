
import { Header } from "@/components/common/header";
import { SidebarNav } from "@/components/common/sidebar-nav";
import { Footer } from "@/components/common/footer";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1">
          <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="p-2 flex items-center justify-between">
              {/* Placeholder for logo or title inside sidebar if needed when collapsed */}
              <div className="w-full flex justify-end">
                 <SidebarTrigger className="hidden md:flex" />
              </div>
            </SidebarHeader>
            <ScrollArea className="flex-1">
              <SidebarContent>
                <SidebarNav />
              </SidebarContent>
            </ScrollArea>
            <SidebarFooter>
              {/* Optional: Sidebar footer content */}
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
              {children}
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
