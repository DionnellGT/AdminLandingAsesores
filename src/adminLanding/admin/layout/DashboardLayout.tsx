import { useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";

import { AppSidebar } from "./components/AppSidebar";

export const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border md:block">
        <AppSidebar />
      </aside>

      {/* Sidebar mobile (overlay) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-64 border-r border-sidebar-border">
            <AppSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-foreground"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-sm font-semibold">Admin Landing</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
