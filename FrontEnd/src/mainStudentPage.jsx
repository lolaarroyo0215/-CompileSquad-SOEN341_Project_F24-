import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function MainStudentPage() {

  const navigate = useNavigate();

  function handleLogout(event) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem("student_id");
    navigate('/');
  }

  function checkoutProfile(event) {
    navigate('/student-profile');
  }

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
    <nav className="bg-red-900 p-4 flex justify-between items-center">
        <div className="text-white text-lg flex items-center">
            {/* Logo image */}
            <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center space-x-6">
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

      
      <div className="p-8 mt-4 flex-grow">
        <h1 className="text-4xl font-bold text-black text-center">
          Welcome To the GCS Peer Assessment Tool
        </h1>
        <h2 className="text-2xl font-semibold text-black mt-16">
          What do you want to do?
        </h2>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {/* <Link to="/new-assessment">
            <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
              <img src="/img/NewAssessment.jpg" alt="Create Teams" className="h-40 w-45 object-cover rounded-lg mb-2" />
              <span className="text-xl mt-9">New Assessment</span>
            </button>
          </Link> */}
        

          <Link to="/view-my-grades">
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/MyGrades.jpg" alt="Current Teams" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">View My Grades</span>
          </button>
          </Link>

          <Link to= "/view-my-teams">
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/MyTeams.jpg" alt="Assessment Results" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">View My Teams</span>
          </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-900 text-white text-right py-4 px-4">
        <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}