import { useState, useEffect } from "react";
import StudentHeader from "../components/Student/StudentHeader";
import EventFilter from "../components/Student/EventFilter";
import EventGrid from "../components/Student/EventGrid";

export default function StudentMainContent() {
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const endpoints = [
          "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/userLogin.php",
          "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/event.php",
        ];

        // Fetch both endpoints in parallel
        const responses = await Promise.all(
          endpoints.map((url) => fetch(url, { credentials: "include" })),
        );

        // Check for HTTP errors
        responses.forEach((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        });

        // Parse JSON from both responses
        const [userData, eventData] = await Promise.all(
          responses.map((res) => res.json()),
        );

        if (userData.success) {
          setUser(userData.user);
        } else {
          console.log("Login failed or no user:", userData.message);
        }

        if (eventData.success) {
          setEvent(eventData.data);
        }
      } catch (err) {
        console.error("Data fetching failed:", err.message);
      }
    }

    fetchInitialData();
  }, []);

  return (
    // &lt;&gt;
    <div className="font-display bg-background-light dark:bg-background-dark">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <StudentHeader user={user} />
          <main className="flex flex-1 py-5 sm:py-8 lg:py-10">
            <div className="flex p-4 flex-col mt-[20px] ml-[30px] w-full gap-3">
              <EventFilter />
              <EventGrid events={event} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
