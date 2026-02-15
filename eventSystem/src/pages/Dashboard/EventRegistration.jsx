import { useLocation } from "react-router-dom";

export default function EventRegistration() {
  const location = useLocation();
  const event = location.state?.event;

  return (
    <div className="font-display bg-background-light dark:bg-background-dark">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <h1 className="text-3xl font-bold text-center mt-10">
            Event Registration: {event?.title}
          </h1>
          {/* Event registration form or details can be added here */}
        </div>
      </div>
    </div>
  );
}
