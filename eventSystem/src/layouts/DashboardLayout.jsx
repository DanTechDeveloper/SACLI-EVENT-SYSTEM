import { Outlet } from "react-router";
import DashSidebar from "../components/Dashboard/DashSidebar";

export default function DashboardLayout() {
  return (
    <>
      <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
        <div className="relative flex w-full">
          <aside className="fixed h-screen flex w-64 flex-col bg-white dark:bg-surface-dark p-4 border-r border-violet-100 dark:border-violet-900/40 shadow-sm z-20">
            <DashSidebar />
          </aside>
        </div>
        <main className="ml-64 flex flex-1 flex-col p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
}

