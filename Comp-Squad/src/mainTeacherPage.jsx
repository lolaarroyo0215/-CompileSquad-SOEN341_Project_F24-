import { useState } from 'react';
import './index.css';

export default function MainTeacherPage() {
    return (
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <nav className="bg-[#800020] p-4 flex justify-between items-center">
          <div className="text-white text-lg">
            {/* TODO Logo image */}
            <img src="/img/logo.png" alt="Logo" className="h-8" />
          </div>
          <div className="flex space-x-10">
            <span className="text-white hover:text-gray-400 cursor-pointer">Profile</span>
            <span className="text-white hover:text-gray-400 cursor-pointer">Log Out</span>
          </div>
        </nav>

        {/* Welcome Message */}
        <div className="p-8 mt-4 flex-grow"> {/* Use flex-grow to fill available space */}
          <h1 className="text-4xl font-bold text-[#800020]">Welcome To the GCS Peer Assessment Tool!</h1>
          <h2 className="text-2xl font-semibold text-black mt-16">What do you want to do?</h2> 
          
          {/* Button List */}
          <div className="mt-16 space-y-4 flex flex-col items-center mb-10"> {/* Added mb-10 for margin bottom */}
            <button className="bg-[#800020] text-white font-bold py-5 w-80 rounded hover:bg-[#6b001c]"> 
              Create Teams
            </button>
            <button className="bg-[#800020] text-white font-bold py-5 w-80 rounded hover:bg-[#6b001c]">
              Assessment Results
            </button>
            <button className="bg-[#800020] text-white font-bold py-5 w-80 rounded hover:bg-[#6b001c]"> 
              Past Assessments
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#800020] text-white text-right py-4 mt-auto px-4">
          <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
        </footer>
      </div>
    );
}