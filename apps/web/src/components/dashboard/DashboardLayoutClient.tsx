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
    <div className="dashboard min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(106,91,255,0.08),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(39,197,255,0.08),transparent_28%),linear-gradient(135deg,#05060a_0%,#0b0f18_100%)] text-gray-50">
      <DashboardSidebar />
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <DashboardHeader user={user} />
        <main className="max-w-full overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
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
