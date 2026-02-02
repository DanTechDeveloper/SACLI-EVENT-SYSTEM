import { useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashContent from "./pages/DashContent";
import AuthLogin from "./components/Auth/AuthLogin";
import AuthRegister from "./components/Auth/AuthRegister";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />} path="/">
            <Route index element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
