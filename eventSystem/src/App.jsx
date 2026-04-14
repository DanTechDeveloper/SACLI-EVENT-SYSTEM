import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashContent from "./pages/Dashboard/DashContent";
import AuthLogin from "./components/Auth/AuthLogin";
import AuthRegister from "./components/Auth/AuthRegister";
import StudentMainContent from "./pages/StudentMainContent";
import AllEvent from "./pages/Dashboard/AllEvent";
import Callback from "./components/Auth/callback";
import AddNewEvent from "./pages/Dashboard/AddNewEvent";
import AddNewAnnouncement from "./pages/Dashboard/AddNewAnnouncement";
import StudentAnnouncement from "./pages/StudentAnnouncement";
import EventRegistration from "./pages/Dashboard/EventRegistration";
import PublishedAnnouncement from "./pages/Dashboard/PublishedAnnouncement";
import PublishedEvent from "./pages/Dashboard/PublishedEvent";
import Announcement from "./pages/Dashboard/Announcement";
import StudentRecentlyJoined from "./pages/StudentRecentlyJoined";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/callback" element={<Callback />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashContent />} path="/dashboard" />
            <Route element={<AllEvent />} path="/events" />
            <Route element={<AddNewEvent />} path="/newEvent" />
            <Route element={<AddNewAnnouncement />} path="/newAnnouncement" />
            <Route element={<Announcement />} path="/announcements" />
            <Route
              element={<PublishedAnnouncement />}
              path="/publishedAnnouncement"
            />
            <Route
              element={<PublishedEvent />}
              path="/publishEvent"
            />
          </Route>
          <Route element={<StudentMainContent />} index path="/studentView" />
          <Route
            element={<StudentAnnouncement />}
            path="/studentAnnouncement"
          />
          <Route
            element={<StudentRecentlyJoined />}
            path="/studentRecentlyJoined"
          />
          <Route element={<EventRegistration />} path="/eventRegistration" />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
