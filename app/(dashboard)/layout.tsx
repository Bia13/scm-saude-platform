import { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <SidebarProvider defaultOpen>

        <AppSidebar />

        <SidebarInset className="flex min-h-screen flex-col bg-muted/20">

          <AppHeader />

          <main className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-7xl p-6">
              {children}
            </div>
          </main>

        </SidebarInset>

      </SidebarProvider>
    </TooltipProvider>
  );
}