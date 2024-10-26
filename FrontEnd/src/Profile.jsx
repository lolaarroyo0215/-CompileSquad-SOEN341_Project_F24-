import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';


export default function Profile(){

    const navigate = useNavigate();

    // Initialize state for student data
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function handleLogout(event) {
        event.preventDefault();
        navigate('/');
    }

    // Fetch student data from student API
    useEffect(() => {
        axios.get('http://localhost:8000/userRegApi/userregapi_student', {
            withCredentials: true //for session based authorization
        }).then(response => {
            setStudent(response.data);
            setLoading(false);

        }).catch(err => {
            setError('Error fetching student data');
            setLoading(false);
        });
    }, []);

    if(loading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>{error}</div>;
    }


    return (
        <div className="bg-slate-200 min-h-screen flex flex-col">
          {/*Navbar*/}  
          <nav className="bg-red-900 p-4 flex justify-between items-center">
            <div className="text-white text-lg">
              {/* Logo image */}
              <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
            </div>
            <div className="flex space-x-10">
              <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
              <span className="text-white hover:text-red-950 cursor-pointer"></span>
              <button type='button' onClick={handleLogout} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log Out</button>
            </div>
          </nav>
    

        {/* Main content */}
      <div className="p-8 mt-4 flex-grow">
        <h1 className="text-4xl font-bold text-black text-center">Student Profile</h1>

        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Profile Picture */}
            <img
              src="/img/profile-placeholder.png"
              alt="Profile Picture"
              className="h-32 w-32 object-cover rounded-full mb-4"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-900 mb-2">{student.name}</h2>
            <p className="text-lg text-gray-600">{student.email}</p>
            <p className="text-lg text-gray-600">{student.major}</p>
            <p className="text-lg text-gray-600">Year: {student.year}</p>
            <p className="text-md text-gray-600 mt-4">{student.bio}</p>
          </div>
        </div>
      </div>
            
    
          {/* Footer */}
          <footer className="bg-red-900 text-white text-right py-4 px-4">
            <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
          </footer>
        </div>
      );
}