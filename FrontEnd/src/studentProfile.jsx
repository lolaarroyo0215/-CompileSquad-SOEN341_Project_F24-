import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

export default function StudentProfile() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem("student_id");

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle logout function
    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("student_id");
        navigate('/');
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/userRegApi/get-studentData/${studentId}/`, {
            withCredentials: true
        })
        .then(response => {
            console.log(response.data);
            setStudent(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError('Error fetching student data');
            setLoading(false);
        });
    }, [studentId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-900">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-900">
                <div className="text-white text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-red-900">
            {/* Sidebar (Nav Bar) */}
            <div className="w-64 bg-gray-200 text-black p-6 fixed top-16 left-0 h-full md:block hidden">
                {/* Adjusted 'top-16' to add space for the header */}
                <h2 className="bg-gray-300 text-2xl font-bold mb-3 p-5">Student Dashboard</h2>
                <ul>
                    <li className="mb-4 hover:bg-gray-700 rounded-lg">
                        <a href="/student-profile" className="block p-2">Profile</a>
                    </li>
                    <li className="mb-4 hover:bg-gray-700 rounded-lg">
                        <a href="/student" className="block p-2">My Dashboard</a>
                    </li>
                    <li className="mb-4 hover:bg-gray-700 rounded-lg">
                        <a href="/view-my-teams" className="block p-2">View My Teams</a>
                    </li>
                    <li className="mb-4 hover:bg-gray-700 rounded-lg">
                        <a href="/view-my-grades" className="block p-2">View My Grades</a>
                    </li>
                </ul>
                <ul className='p-3'>
                    <img src='/img/concordialogo.png' alt='concordia-logo' />
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-64 p-8">
                {/* Top Navigation */}
                <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
                    <div className="text-white text-lg flex items-center">
                        <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                        <span className="ml-2 font-semibold">Welcome, {student.first_name}!</span>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 text-sm font-medium text-white bg-red-900 hover:bg-red-950 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </nav>

                {/* Profile Information */}
                <div className="mt-24 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    {/* Adjusted 'mt-24' to provide space for the header */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Student Profile
                    </h1>
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <div className="w-32 font-semibold text-gray-700">First Name:</div>
                            <div className="text-gray-800">{student.first_name}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-32 font-semibold text-gray-700">Last Name:</div>
                            <div className="text-gray-800">{student.last_name}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-32 font-semibold text-gray-700">Email:</div>
                            <div className="text-gray-800">{student.email}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-32 font-semibold text-gray-700">Student ID:</div>
                            <div className="text-gray-800">{student.user_id}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
