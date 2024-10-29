import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function MainTeacherPage() {
  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <nav className="bg-red-900 p-4 flex justify-between items-center">
        <div className="text-white text-lg">
          {/* Logo image */}
          <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex space-x-10">
          <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
          <span className="text-white hover:text-red-950 cursor-pointer">Log Out</span>
        </div>
      </nav>

      {/* Main content flex-grow to push the footer down */}
      <div className="p-8 mt-4 flex-grow">
        <h1 className="text-4xl font-bold text-black text-center">
          Welcome To the GCS Peer Assessment Tool
        </h1>
        <h2 className="text-2xl font-semibold text-black mt-16">
          What do you want to do?
        </h2>



        {/* Button List */}


        <div className="mt-8 flex justify-center gap-4 flex-wrap">

          

          <Link to="/create-teams">
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/CreateTeams.jpg" alt="Create Teams" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">Create Teams</span>
          </button>
          </Link>
          

          <Link to="/current-teams">
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/CurrentTeams.jpg" alt="Current Teams" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">Current Teams</span>
          </button>
          </Link>

          <Link to="/assessment-results">
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/Results.jpg" alt="Assessment Results" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">Assessment Results</span>
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
