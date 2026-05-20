import { useEffect, useState } from 'react';
import apiRequest from '../../services/apiRequest';
import { useNavigate } from 'react-router';
export default function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiRequest("http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/Students.php");
      if (response && response.success) {
        setStudents(response.data);
      } else {
        console.error("Failed to fetch students data:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (student) => {
    navigate(`/students/${student.studentID}`, { state: { student } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStudents = students.filter(student => {
    const fullName = student.fullName || student.name || '';
    const course = student.course || '';
    const query = searchQuery.toLowerCase();
    return fullName.toLowerCase().includes(query) || course.toLowerCase().includes(query);
  });
  return (
    <div className="flex flex-col gap-8 w-full p-4 md:p-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] uppercase">
            Students
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
            Manage and view student information.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input 
              type="text" 
              id="search" 
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 block w-full pl-11 p-3 dark:bg-gray-800/50 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500/50 dark:focus:border-violet-500 transition-all duration-300 shadow-sm hover:shadow-md" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl shadow-gray-200/40 dark:shadow-none bg-white dark:bg-gray-800/80 backdrop-blur-sm">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 dark:bg-gray-900/50 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-5 font-bold tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-5 font-bold tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-5 font-bold tracking-wider text-center">
                  Events Joined
                </th>
                <th scope="col" className="px-6 py-5 font-bold tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Loading students...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 font-medium">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <tr 
                    key={student.id} 
                    className={`
                      bg-white dark:bg-transparent 
                      hover:bg-violet-50/50 dark:hover:bg-violet-900/10 
                      transition-all duration-200 group
                      ${index !== filteredStudents.length - 1 ? 'border-b border-gray-50 dark:border-gray-700/50' : ''}
                    `}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      {student.fullName || student.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-violet-100/80 text-violet-700 text-xs font-bold px-3 py-1 rounded-full dark:bg-violet-900/30 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50 shadow-sm">
                        {student.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700/50 font-bold text-gray-700 dark:text-gray-300 group-hover:bg-violet-100 group-hover:text-violet-700 dark:group-hover:bg-violet-900/50 dark:group-hover:text-violet-300 transition-colors">
                        {student.eventsJoined}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleView(student)} type="button" className="inline-flex items-center gap-1.5 font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 hover:underline transition-all duration-200">
                        <span>View</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}