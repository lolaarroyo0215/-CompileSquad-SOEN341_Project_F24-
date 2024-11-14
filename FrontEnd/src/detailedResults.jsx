import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const DetailedResults = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch student data
        axios.get('http://localhost:8000/userRegApi/get_students/')
            .then(response => {
                setStudents(response.data); // Assume response data is an array of student objects
            })
            .catch(error => {
                console.error("Error fetching students:", error);
            });
    }, []);

    const fetchEvaluationsForStudents = async () => {
        try {
            const evaluationData = [];
            for (const student of students) {
                if (student.user_id) {
                    const response = await axios.get(`http://localhost:8000/userRegApi/get-evaluations/${student.user_id}/1/`, {
                        withCredentials: true
                    });
                    console.log(`Evaluations for student ${student.user_id}:`, response.data);
                    evaluationData.push({ studentId: student.user_id, evaluations: response.data });
                }
            }
            console.log("All evaluations data:", evaluationData);
            setEvaluations(evaluationData);
        } catch (error) {
            console.error('Error fetching evaluations:', error.response || error.message || error);
            setError('Failed to load evaluations data');
        }
    };

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("student_id");
        navigate('/');
    }    

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

            {/* Main content */}
            <div className="flex-grow ml-64 p-8 pt-20 pb-20">
                {/* Fixed header */}
                <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
                    <div className="text-white text-lg flex items-center">
                        <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                    </div>
                    <div className="flex items-center space-x-6">
                        <span className="text-white hover:text-red-950 cursor-pointer py-2 px-4 text-sm font-medium bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
                            Profile
                        </span>
                        <button 
                            type="button" 
                            onClick={handleLogout} 
                            className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
                        >
                            Log Out
                        </button>
                    </div>
                </nav>

                <h1 className="text-3xl font-bold text-black mt-12 mb-20 text-center">Detailed Assessment Results</h1>
                
                {/* Display student data */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-2xl font-bold mb-4">Student List</h2>
                    <ul>
                        {students.map((student) => (
                            <li key={student.id} className="p-2 border-b border-gray-200">
                                {student.first_name} {student.last_name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4 w-full fixed bottom-0">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DetailedResults;
