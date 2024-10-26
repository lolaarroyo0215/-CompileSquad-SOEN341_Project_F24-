import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function CurrentTeamsPage() {

  const navigate = useNavigate();

  // Sample data for teams before linking with database
  const classes = [
    {
      className: 'SOEN 341',
      teams: [
        {
          teamName: 'Team Alpha',
          members: ['Alice', 'Bob', 'Charlie'],
        },
        {
          teamName: 'Team Beta',
          members: ['Dave', 'Eve', 'Frank'],
        },
      ],
    },
    {
      className: 'SOEN 342',
      teams: [
        {
          teamName: 'Team Gamma',
          members: ['Grace', 'Hank', 'Isaac'],
        },
        {
          teamName: 'Team Delta',
          members: ['John', 'Kara', 'Liam'],
        },
      ],
    },

  ];

  // State to manage which class is expandef
  const [openClass, setOpenClass] = useState(null);

  // Function to toggle a class's dropdown
  const toggleClass = (className) => {
    setOpenClass(openClass === className ? null : className);
  };

  function handleLogout(event) {
    event.preventDefault();
    navigate('/');
  }

  function goToProfile(event) {
    event.preventDefault();
    navigate('/profile');
  }

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      {/* Header */}
      <nav className="bg-red-900 p-4 flex justify-between items-center">
        <div className="text-white text-lg">
          <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex space-x-10">
        <button type='button' onClick={goToProfile} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Profile</button>
          <button type='button' onClick={handleLogout} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log Out</button>
        </div>
      </nav>

      {/* Teams Section */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Teams by Class</h1>
        {classes.map((classItem, index) => (
          <div key={index} className="mb-6">
            {/* Dropdown toggle button */}
            <button
              onClick={() => toggleClass(classItem.className)}
              className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
            >
              {classItem.className}
            </button>

            {/* Teams dropdown content  */}
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
      <footer className="bg-red-900 text-white text-right py-4 px-4">
        <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}