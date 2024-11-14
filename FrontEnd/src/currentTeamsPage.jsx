import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';

export default function CurrentTeamsPage() {
  const navigate = useNavigate();
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
    <div className="bg-slate-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 text-black p-5 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900">
        <ul className="mt-20">
          <li className="mb-4">
            <a href="/profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Profile</a>
          </li>
          <li className="mb-4">
            <a href="/teacher" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">My Dashboard</a>
          </li>
          <li className="mb-4">
            <a href="/create-classes" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Create class</a>
          </li>
          <li className="mb-4">
            <a href="/create-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Create Teams</a>
          </li>
          <li className="mb-4">
            <a href="/current-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Current Teams</a>
          </li>
          <li className="mb-4">
            <a href="/assessment-results" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Assessment Results</a>
          </li>
        </ul>
        <ul className='p-3 mt-8'>
          <img src='/img/concordialogo.png' alt='concordia-logo' />
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 p-8">
        {/* Header */}
        <nav className="bg-red-900 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
          <div className="text-white text-lg">
            <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
          </div>
          <div className="flex space-x-10">
            <button 
              type='button' 
              onClick={checkoutProfile} 
              className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
              Profile
            </button>
            <button 
              type='button' 
              onClick={handleLogout} 
              className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
              Log Out
            </button>
          </div>
        </nav>

        {/* Teams Section */}
        <h1 className="text-3xl font-bold text-black mb-6 text-center mt-20">Teams by Class</h1>
        {classes.map((classItem, index) => (
          <div key={index} className="mb-6">
            {/* Dropdown toggle button */}
            <button
              onClick={() => toggleClass(classItem.className)}
              className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
            >
              {classItem.className}          
            </button>

            {/* Teams dropdown content */}
            {openClass === classItem.className && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                {classItem.teams.map((team, idx) => (
                  <div key={idx} className="mb-4">
                    <h2 className="text-xl font-semibold text-black">{team.teamName}</h2>
                    <ul className="list-disc pl-6">
                      {team.members.map((member, memberIdx) => (
                        <li key={memberIdx} className="text-black">{member}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-red-900 text-white text-center py-4 px-4 w-full mt-auto fixed bottom-0 left-0">
        <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}