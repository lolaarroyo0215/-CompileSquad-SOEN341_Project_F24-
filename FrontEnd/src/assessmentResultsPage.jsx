import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

export default function AssessmentResultsPage() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/userRegApi/get_students/');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    function handleLogout(event) {
        event.preventDefault();
        navigate('/');
    }

    const goToDetailedResults = () => {
        navigate('/detailedResults');
    };

    return (
        <div className="flex min-h-screen bg-slate-200">
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

            {/* Header with Profile and Logout */}
            <div className="flex-grow ml-64 p-8 pt-20">
                <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
                    <div className="text-white text-lg flex items-center">
                        <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                    </div>
                    <div className="flex items-center space-x-6">
                        <span className="text-white hover:text-red-950 cursor-pointer py-2 px-4 text-sm font-medium bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
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
            </div>

            {/* Main content */}
            <div className="flex-grow ml-64 p-8 pt-32">
                <h2 className="text-2xl font-bold mb-4">Assessment Results</h2>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Student ID</th>
                            <th className="px-4 py-2 border">First Name</th>
                            <th className="px-4 py-2 border">Last Name</th>
                            <th className="px-4 py-2 border">Team</th>
                            <th className="px-4 py-2 border">Cooperation</th>
                            <th className="px-4 py-2 border">Conceptual Contribution</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td className="px-4 py-2 border">{student.user_id}</td>
                                <td className="px-4 py-2 border">{student.first_name}</td>
                                <td className="px-4 py-2 border">{student.last_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4 w-full fixed bottom-0">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}
