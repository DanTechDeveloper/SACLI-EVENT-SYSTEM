import { Outlet } from "react-router";
import DashSidebar from "../components/Dashboard/DashSidebar";

export default function DashboardLayout(){
    return <>
    <div className="font-display bg-background-light dark:bg-background-dark">
        
        <div className="relative flex w-full">
            <aside className="fixed h-screen flex w-64 flex-col bg-white p-4 dark:bg-background-dark dark:border-r dark:border-slate-800">
                <DashSidebar/>
            </aside>
        </div>

     <main className="ml-64 flex flex-1 flex-col p-8">
        <Outlet/>
     </main>

    </div>
    </>
}