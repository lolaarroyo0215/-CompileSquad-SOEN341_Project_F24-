import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';

export default function CurrentTeamsPage() {
  const navigate = useNavigate();
  const teacherId = 1;
  const { courseId } = useParams();
  const [classes, setClasses] = useState([]); // State for storing teams by class
  const [openClass, setOpenClass] = useState(null); // State to manage which class is expanded

  // Function to toggle a class's dropdown
  const toggleClass = (className) => {
    setOpenClass(openClass === className ? null : className);
  };

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("instructor_id");
    navigate('/');
  }

  function checkoutProfile(event) {
    event.preventDefault();
    navigate('/profile');
  }

  // Fetch teams data from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const courseId = 'your_course_id';
        const response = await fetch(`http://localhost:8000/userRegApi/get-groups/${courseId}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Organizing teams by class
        const organizedClasses = data.reduce((acc, team) => {
          const { selected_class, team_name, selected_members } = team;
          if (!acc[selected_class]) {
            acc[selected_class] = { className: selected_class, teams: [] };
          }
          acc[selected_class].teams.push({ teamName: team_name, members: selected_members.split(', ') });
          return acc;
        }, {});

        setClasses(Object.values(organizedClasses));
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    if(courseId) fetchTeams();
    
  }, [courseId]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 text-black p-6 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900 z-10">
          <ul className="mt-28">
            <li className="mb-4">
              <a href="/profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Profile</a>
            </li>
            <li className="mb-4">
              <a href="/student" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">My Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="/new-assessment" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">New Assessment</a>
            </li>
            <li className="mb-4">
              <a href="/view-my-grades" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">View My Grades</a>
            </li>
            <li className="mb-4">
              <a href="/view-my-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">View My Teams</a>
            </li>
          </ul>
          <ul className='p-3 mt-8'>
            <img src='/img/concordialogo.png' alt='concordia-logo' />
          </ul>
        </div>
  
        {/* Main content */}
        <div className="flex-grow ml-0 md:ml-64 p-8 pt-20 pb-32 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-black mt-12 mb-20 text-center">Your Grades by Class</h1>
          {classesData.map((classItem, index) => (
            <div key={index} className="mb-6 w-full md:w-2/3 lg:w-1/2">
              <button
                onClick={() => toggleClass(classItem.group)}
                className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
              >
                {classItem.group}
              </button>
              {openClass === classItem.group && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                  <table className="table-auto w-full text-left mb-4">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2 text-center">Average Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(classItem.averages).map(([category, average], idx) => (
                        <tr key={idx} className="border-b">
                          <td className="px-4 py-2">{categoryDisplayNames[category] || category}</td>
                          <td className="px-4 py-2 text-center">{average}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h3 className="text-lg font-bold mb-2">Feedback</h3>
                  {classItem.feedback.map((fb, fbIdx) => (
                    <p key={fbIdx} className="mb-2 border-b border-gray-300 pb-2">{fb}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  
      {/* Footer */}
      <footer className="bg-red-900 text-white py-4 px-4 text-center">
        <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
      </footer>
    </div>
  );  
}
