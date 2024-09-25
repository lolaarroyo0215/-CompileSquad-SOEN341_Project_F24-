import { useState } from 'react';
import './index.css';

export default function MainStudentPage() {
  return (


    <div className="bg-slate-200 min-h-screen flex flex-col">
      <nav className="bg-red-900 p-4 flex justify-between items-center">
        <div className="text-white text-lg">

          {/* TODO Logo image */}
          <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex space-x-10">
          <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
          <span className="text-white hover:text-red-950 cursor-pointer">Log Out</span>
        </div>
      </nav>


      {/* Welcome Message */}
      <div className="p-8 mt-4">
        <h1 className="text-4xl font-bold text-black text-center">
          Welcome To the GCS Peer Assessment Tool
        </h1>
        <h2 className="text-2xl font-semibold text-black mt-16">
          What do you want to do?
        </h2>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/NewAssessment.jpg" alt="Create Teams" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">New Assessment</span>
          </button>
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/MyGrades.jpg" alt="Current Teams" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">View My Grades</span>
          </button>
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/MyTeams.jpg" alt="Assessment Results" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">View My Teams</span>
          </button>
          <button className="bg-red-900 text-white font-bold py-5 w-80 h-80 flex flex-col items-center justify-start rounded hover:bg-red-950">
            <img src="/img/PastAssessmentsStudent.jpg" alt="Past Assessments" className="h-40 w-45 object-cover rounded-lg mb-2" />
            <span className="text-xl mt-9">Past Assessments</span>
          </button>
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-red-900 text-white text-right py-4 px-4 mt-10">
        <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
      </footer>
    </div>



  );
}

