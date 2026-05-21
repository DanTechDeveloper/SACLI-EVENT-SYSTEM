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
import UpcomingEvent from "./pages/UpcomingEvent";
import ViewDetails from "./pages/Dashboard/ViewDetails";
import EventApprovals from "./pages/Dashboard/EventApprovals";
import AnnouncementApprovals from "./pages/Dashboard/AnnouncementApprovals";
import Students from "./pages/Dashboard/Students";
import EventParticipants from "./pages/Dashboard/EventParticipants";
import StudentDetail from "./pages/Dashboard/StudentDetail";
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
            <Route index element={<DashContent />} path="/admin/dashboard" />
            <Route element={<EventApprovals />} path="/admin/eventApprovals" />
            <Route element={<AnnouncementApprovals />} path="/admin/announcementApprovals" />
            <Route element={<AllEvent />} path="/admin/events" />
            <Route element={<AddNewEvent />} path="/admin/newEvent" />
            <Route element={<AddNewAnnouncement />} path="/admin/newAnnouncement" />
            <Route element={<Announcement />} path="/admin/announcements" />
            <Route element={<PublishedAnnouncement />} path="/admin/publishedAnnouncement" />
            <Route element={<PublishedEvent />} path="/admin/publishEvent" />
            <Route element={<UpcomingEvent />} path="/admin/upcomingEvents" />
            <Route element={<Students />} path="/admin/students" />
            <Route element={<EventParticipants />} path="/admin/eventParticipants" />
            <Route path="/admin/students/:id" element={<StudentDetail />} />
          </Route>

          <Route element={<StudentMainContent />} index path="/studentView" />
          <Route
            element={<StudentAnnouncement />}
            path="/studentAnnouncement"
          />
          <Route element={<ViewDetails />} path="/viewDetails" />
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
