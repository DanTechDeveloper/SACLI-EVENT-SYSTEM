import { Outlet } from "react-router-dom";
import StudentHeader from "../components/Student/StudentHeader";
import StudentView from "../pages/StudentView";
export default function StudentLayout() {
  return (
    <>
      <div className="font-display bg-background-light dark:bg-background-dark">
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <StudentHeader />
            <main class="flex flex-1 py-5 sm:py-8 lg:py-10">
              <StudentView />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
