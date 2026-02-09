import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashContent from "./pages/Dashboard/DashContent";
import AuthLogin from "./components/Auth/AuthLogin";
import AuthRegister from "./components/Auth/AuthRegister";
import StudentMainContent from "./pages/StudentMainContent";
import AllEvent from "./pages/Dashboard/AllEvent";
import Upcomimg from "./pages/Dashboard/Upcoming";
import AddNewEvent from "./pages/Dashboard/AddNewEvent";
import AddNewAnnouncement from "./pages/Dashboard/AddNewAnnouncement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashContent />} path="/dashboard" />
            <Route element={<AllEvent />} path="/events" />
            <Route element={<Upcomimg />} path="/upcoming" />
            <Route element={<AddNewEvent />} path="/newEvent" />
            <Route element={<AddNewAnnouncement />} path="/newAnnouncement" />
          </Route>
          <Route element={<StudentMainContent />} index path="/studentView" />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
