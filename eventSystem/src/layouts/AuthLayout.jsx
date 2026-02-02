import { Outlet } from "react-router";
import AuthHeader from "../components/Auth/AuthHeader";
import AuthFooter from "../components/Auth/AuthFooter";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
        <AuthHeader />
        <main class="flex-grow flex items-center justify-center">
        <Outlet/>
        </main>
        <AuthFooter />
      </div>
    </>
  );
}
