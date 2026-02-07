import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashContent from "./pages/DashContent";
import AuthLogin from "./components/Auth/AuthLogin";
import AuthRegister from "./components/Auth/AuthRegister";
import AuthAdmin from "./components/Auth/AuthAdmin";
import StudentLayout from "./layouts/StudentLayout";
import StudentView from "./pages/StudentView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />} path="/">
            <Route index element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
          </Route>

          <Route element={<DashboardLayout />} path="/">
            <Route index element={<DashContent />} path="/dashboard" />
          </Route>

          <Route element={<StudentLayout/>} path="/">
            <Route element={<StudentView/>} index path="/studentView"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
