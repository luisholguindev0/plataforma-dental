"use client";

import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import DashboardSidebar from "./Sidebar";
import DashboardHeader from "./Header";
import { User } from "@supabase/supabase-js";

function DashboardContent({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] dashboard">
      <DashboardSidebar />
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <DashboardHeader user={user} />
        <main className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayoutClient({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent user={user}>{children}</DashboardContent>
    </SidebarProvider>
  );
}
