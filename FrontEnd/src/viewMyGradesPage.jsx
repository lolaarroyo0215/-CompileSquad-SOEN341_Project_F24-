import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function ViewMyGrades() {
  const navigate = useNavigate();

  const classes = [
    {
      className: 'SOEN 341',
      grades: [
        { category: 'Cooperation', grade: '5' },
        { category: 'Conceptual Contribution', grade: '5' },
        { category: 'Practical Contribution', grade: '5' },
        { category: 'Work Ethic', grade: '5' },
      ],
    },
    {
      className: 'SOEN 342',
      grades: [
        { category: 'Cooperation', grade: '5' },
        { category: 'Conceptual Contribution', grade: '5' },
        { category: 'Practical Contribution', grade: '5' },
        { category: 'Work Ethic', grade: '5' },
      ],
    },
  ];

  // State to manage which class is expanded
  const [openClass, setOpenClass] = useState(null);

  function handleLogout(event) {
    event.preventDefault();
    navigate('/');
  }

  function checkoutProfile(event) {
    event.preventDefault();
    navigate('/profile');
  }

  // Function to toggle a class's dropdown
  const toggleClass = (className) => {
    setOpenClass(openClass === className ? null : className);
  };

  return (
    <div className="flex min-h-screen bg-slate-200">
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
      <div className="flex-grow ml-64 p-8 pt-20 pb-32">
        {/* Fixed header */}
        <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-40">
          <div className="text-white text-lg flex items-center">
            <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
          </div>
          <div className="flex items-center space-x-6">
            <span
              className="text-white hover:text-red-950 cursor-pointer py-2 px-4 text-sm font-medium bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
              onClick={checkoutProfile}
            >
              Profile
            </span>
            <button
              type='button'
              onClick={handleLogout}
              className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
            >
              Log Out
            </button>
          </div>
        </nav>

        <h1 className="text-3xl font-bold text-black mt-12 mb-20 text-center">Your Grades by Class</h1>

        {/* Grades Section */}
        {classes.map((classItem, index) => (
          <div key={index} className="mb-6">
            {/* Dropdown toggle button */}
            <button
              onClick={() => toggleClass(classItem.className)}
              className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
            >
              {classItem.className}
            </button>

            {/* Grades dropdown content (visible when class is open) */}
            {openClass === classItem.className && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <table className="table-auto w-full text-left">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classItem.grades.map((gradeItem, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-4 py-2">{gradeItem.category}</td>
                        <td className="px-4 py-2 text-center">{gradeItem.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-red-900 text-white text-right py-4 fixed bottom-0 left-0 w-full z-30">
        <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}