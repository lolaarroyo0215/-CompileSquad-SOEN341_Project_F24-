import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function ClassCreationPage() {
    const navigate = useNavigate();
    const [className, setClassName] = useState('');
    const [classCode, setClassCode] = useState('');

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("instructor_id");
        navigate('/');
    };

    const handleClassSubmit = async (event) => {
        event.preventDefault();
        if (!className || !classCode) {
            alert('Class name and class code are required');
            return;
        }
        const instructorId = localStorage.getItem("instructor_id");
            const postData = {
                course_name: className,
                course_code: classCode,
                teacher: instructorId
            };
        try{
            const response = await axios.post('http://localhost:8000/userRegApi/create-course/', postData);
            if (response.status === 200 || response.status === 201) {
                alert('Class created successfully');
            } else {
                console.log(postData);
                alert('Failed to create class: ' + response.data.detail);
            }
        } catch (error) {
            console.error('Error creating class:', error);
            console.log(postData);
            alert('There was an issue creating the class');
        }
        setClassName('');
        setClassCode('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-200">
            {/* Sidebar */}
            <div className="w-64 bg-gray-200 text-black p-5 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900">
                <ul className="mt-20">
                    <li className="mb-4">
                        <a href="/teacher-profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Profile</a>
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
                    {/* <li className="mb-4">
                        <a href="/current-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Current Teams</a>
                    </li> */}
                    <li className="mb-4">
                        <a href="/assessment-results" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Assessment Results</a>
                    </li>
                </ul>
                <ul className='p-3 mt-8'>
                    <img src='/img/concordialogo.png' alt='concordia-logo' />
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-grow ml-64 p-8 pt-20 pb-24">
                {/* Fixed header */}
                <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
                    <div className="text-white text-lg flex items-center">
                        <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                    </div>
                    <div className="flex items-center space-x-6">
                    <button 
                        type='button' 
                        onClick={() => navigate("/teacher-profile")} 
                        className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
                        Profile
                    </button>
                        <button
                            type='button'
                            onClick={handleLogout}
                            className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
                        >
                            Log Out
                        </button>
                    </div>
                </nav>

                <h1 className="text-3xl font-bold text-black mt-12 mb-14 text-center">Create A New Class</h1>

                {/* Class creation form */}
                <form onSubmit={handleClassSubmit} className="space-y-4 mb-8">
                    <div>
                        <label htmlFor="className" className="block text-sm font-medium">Class Name</label>
                        <input
                            type="text"
                            id="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="classCode" className="block text-sm font-medium">Class Code</label>
                        <input
                            type="text"
                            id="classCode"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
                        Create Class
                    </button>
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-center py-4 w-full mt-auto absolute bottom-0 left-0">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ClassCreationPage;
