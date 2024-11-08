import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function ClassCreationPage() {
    const navigate = useNavigate();
    const [className, setClassName] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentClass, setStudentClass] = useState('');

    const handleLogout = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const handleClassSubmit = async (event) => {
        event.preventDefault();
        if (!className) {
            alert('Class name is required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/class/create/', { class_name: className });
            if (response.status === 200 || response.status === 201) {
                alert('Class created successfully');
            } else {
                alert('Failed to create class: ' + response.data.detail);
            }
        } catch (error) {
            console.error('Error creating class:', error);
            alert('There was an issue creating the class');
        }
        setClassName('');
    };

    const handleCsvChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const handleCsvSubmit = async (event) => {
        event.preventDefault();
        if (!csvFile) {
            alert('Please select a CSV file');
            return;
        }
        const formData = new FormData();
        formData.append('file', csvFile);
        try {
            const response = await axios.post('http://localhost:8000/class/import-roster/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Roster imported successfully');
            setCsvFile(null);
        } catch (error) {
            console.error('Error importing roster:', error);
            alert('There was an issue importing the roster');
        }
    };

    const handleAddStudent = async (event) => {
        event.preventDefault();
        if (!studentName || !studentId || !studentClass) {
            alert('All fields are required to add a student');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/class/add-student/', {
                name: studentName,
                student_id: studentId,
                class_name: studentClass
            });
            alert('Student added successfully');
            setStudentName('');
            setStudentId('');
            setStudentClass('');
            setShowAddStudentForm(false);
        } catch (error) {
            console.error('Error adding student:', error);
            alert('There was an issue adding the student');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-200">
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
            <div className="flex-grow ml-64 p-8 pt-20 pb-24">
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

                    {/* Student Button and Form */}
                    <button
                        onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                        className="mt-8 bg-red-900 text-white p-2 rounded-md hover:bg-red-950"
                    >
                        {showAddStudentForm ? 'Cancel Add Student' : 'Add Student'}
                    </button>

                    {showAddStudentForm && (
                        <form onSubmit={handleAddStudent} className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="studentName" className="block text-sm font-medium">Student Name</label>
                                <input
                                    type="text"
                                    id="studentName"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="studentId" className="block text-sm font-medium">Student ID</label>
                                <input
                                    type="text"
                                    id="studentId"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="studentClass" className="block text-sm font-medium">Class</label>
                                <input
                                    type="text"
                                    id="studentClass"
                                    value={studentClass}
                                    onChange={(e) => setStudentClass(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
                                Submit Student
                            </button>
                        </form>
                    )}

                    {/* CSV Import Form */}
                    <form onSubmit={handleCsvSubmit} className="mt-8 space-y-4">
                        <h3 className="text-xl font-bold mb-2">Import Class Roster</h3>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleCsvChange}
                            className="block w-full text-sm text-gray-500"
                        />
                        <button type="submit" className="bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
                            Upload Roster
                        </button>
                    </form>
                </form>

               
                <div className="flex justify-center mt-8">
                    <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
                        Create Class
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-center py-4 w-full mt-auto absolute bottom-0 left-0">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ClassCreationPage;