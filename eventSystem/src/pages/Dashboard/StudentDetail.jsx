import { useLocation, useNavigate } from "react-router-dom";

export default function StudentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/admin/students")}
                className="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                <span className="material-symbols-outlined">
                  arrow_back
                </span>
                <span>Back to Students</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {student ? (
          <div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{student.fullName || student.name}</h1>
            <div className="space-y-4">
              <p><strong>Student ID:</strong> {student.studentID}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>Events Joined:</strong> {student.eventsJoined}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">No student data available</h2>
            <p className="text-slate-500 mt-2">
              Try navigating back to the student list and selecting a student again.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}