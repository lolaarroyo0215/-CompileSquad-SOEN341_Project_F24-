import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function handleLogout(){
  const navigate = useNavigate();
  // Redirect to login page
  navigate('/');
};

export default function MainTeammatesPage() {
  // Sample data for teammates
  const classes = [
    {
      className: 'SOEN 341',
      teammates: [
        { name: 'Jane doe' },
        { name: 'Harry Styles ' },
        { name: 'Zayn Malik' },
        { name: 'Niall Horan' },
      ],
    },
    {
      className: 'SOEN 342',
      teammates: [
        { name: 'Liam Payne' },
        { name: 'Louis Tomlinson' },
        { name: 'George Martin' },
        { name: 'Calum hood' },
      ],
    },
    
  ];

  // State to manage which class is expanded
  const [openClass, setOpenClass] = useState(null);

  // Function to toggle a class's dropdown
  const toggleClass = (className) => {
    setOpenClass(openClass === className ? null : className);
  };

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <nav className="bg-red-900 p-4 flex justify-between items-center">
        <div className="text-white text-lg">
          {/* Logo image */}
          <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex space-x-10">
          <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
          <span className="text-white hover:text-red-950 cursor-pointer"><button onClick={handleLogout()}>Log Out</button></span>
        </div>
      </nav>

      {/* Teammates Section */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Your Teammates by Class</h1>
        {classes.map((classItem, index) => (
          <div key={index} className="mb-6">

            {/* Dropdown toggle button */}
            <button
              onClick={() => toggleClass(classItem.className)}
              className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
            >
              {classItem.className}
            </button>


            {openClass === classItem.className && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <table className="table-auto w-full text-left">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Teammate Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classItem.teammates.map((teammate, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-4 py-2">{teammate.name}</td>
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
      <footer className="bg-red-900 text-white text-right py-4 px-4">
        <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}