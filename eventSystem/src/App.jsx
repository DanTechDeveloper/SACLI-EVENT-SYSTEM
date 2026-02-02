import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashContent from "./pages/DashContent";

function App() {
  return <>
  <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout/>} path="/"/>
        <Route path="/dashContent" element={<DashContent/>}/>
      </Routes>
  </BrowserRouter>
  </>;
}
export default App;
