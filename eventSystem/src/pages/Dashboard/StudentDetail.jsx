import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  // Mock data for UI demonstration - replace with student.history from backend later
  const participationHistory = [
    { id: 1, event: "Hackathon", date: "May 18" },
    { id: 2, event: "Seminar", date: "May 17" },
  ];

  const [isEditingID, setIsEditingID] = useState(false);
  const [studentID, setStudentID] = useState(student?.studentID || "");

  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [course, setCourse] = useState(student?.course || "");

  const handleSaveID = () => {
    // Logic for apiRequest to update Student ID would go here
    console.log(`Updating student record ID from ${student.studentID} to: ${studentID}`);
    setIsEditingID(false);
  };

  const handleSaveCourse = () => {
    // Logic for apiRequest to update course would go here
    console.log(`Updating student ${id} course to: ${course}`);
    setIsEditingCourse(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 p-4 md:p-8">
      {/* Navigation Header */}
      <nav className="mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/admin/students")}
            className="group flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold hover:text-violet-700 transition-all duration-200"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Students</span>
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto">
        {student ? (
          <div className="flex flex-col gap-6">
            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {student.fullName || student.name}
                  </h1>
                  <p className="text-slate-500 font-medium mt-1">Student Record #{student.studentID}</p>
                </div>
              </div>
            </div>

            {/* Detailed Info Card */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Information</h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student ID</label>
                  <div className="flex flex-wrap items-center gap-3">
                    {isEditingID ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={studentID}
                          onChange={(e) => setStudentID(e.target.value)}
                          className="bg-slate-50 dark:bg-slate-800 border border-violet-200 dark:border-violet-800 text-slate-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 block w-full p-2 outline-none transition-all"
                        />
                        <button onClick={handleSaveID} className="p-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </button>
                        <button onClick={() => setIsEditingID(false)} className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{studentID}</p>
                        <button onClick={() => setIsEditingID(true)} className="text-violet-500 hover:text-violet-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Events Participated</label>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-bold">
                      {student.eventsJoined}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Total events</span>
                  </div>
                </div>

                <div className="col-span-full space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrolled Course</label>
                  <div className="flex flex-wrap items-center gap-4">
                    {isEditingCourse ? (
                      <div className="flex items-center gap-2 w-full max-w-md">
                        <input
                          type="text"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="bg-slate-50 dark:bg-slate-800 border border-violet-200 dark:border-violet-800 text-slate-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 block w-full p-2.5 outline-none transition-all"
                          placeholder="Enter course name..."
                        />
                        <button onClick={handleSaveCourse} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm transition-colors">Save</button>
                        <button onClick={() => setIsEditingCourse(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl font-bold text-sm transition-colors">Cancel</button>
                      </div>
                    ) : (
                      <>
                        <span className="px-4 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full font-bold border border-violet-200/50 dark:border-violet-800/50">
                          {course}
                        </span>
                        <button
                          onClick={() => setIsEditingCourse(true)}
                          className="text-violet-600 dark:text-violet-400 hover:underline text-sm font-bold flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          Edit Course
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Participation History Card */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Participation History</h2>
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md uppercase tracking-tight">
                  Recent Activities
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-800/30">
                    <tr>
                      <th className="px-8 py-4 font-bold">Event Name</th>
                      <th className="px-8 py-4 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {participationHistory.length > 0 ? (
                      participationHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-700 dark:text-slate-300">
                            {item.event}
                          </td>
                          <td className="px-8 py-4 text-slate-500 dark:text-slate-400">
                            {item.date}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-8 py-10 text-center text-slate-400 italic">No history found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <h2 className="text-2xl font-black text-slate-400 uppercase">No student data found</h2>
            <p className="text-slate-500 mt-2">
              Try navigating back to the student list and selecting a student again.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}