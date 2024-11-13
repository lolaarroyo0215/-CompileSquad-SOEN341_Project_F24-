import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function CreateTeams() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [teamID, setTeamID] = useState("");
    const [teamName, setTeamName] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [classes, setClasses] = useState([]);
    const [csvFile, setCsvFile] = useState(null);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("instructor_id");
        navigate('/');
    };
    const instructorId = localStorage.getItem("instructor_id");

    const handleAddMember = (student) => {
        if (!selectedMembers.some(member => member.user_id === student.user_id)) {
            setSelectedMembers([...selectedMembers, student]);
        } else {
            alert('This member has already been added to the team.');
        }
    };
    

    const handleRemoveMember = (student) => {
        setSelectedMembers(selectedMembers.filter(member => member.user_id !== student.user_id));
        if (selectedMembers.length === 1) setSelectedClass('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!teamName || selectedMembers.length === 0) {
            alert('All fields are required');
            return;
        }
        try {
        
            const groupData = {
                group_code: teamID,
                group_name: teamName,
                course: selectedClass
            };

            console.log(groupData);
            const response = await axios.post('http://localhost:8000/userRegApi/create-group/', groupData);
    
            if (response.status === 200 || response.status === 201) {
                alert('Successful team creation');
            } else {
                alert('Registration failed: ' + response.data.detail);
            }} catch (error) {
                console.error('An error occurred: ', error);
                alert('There was an issue registering your team');
            }
        try {

            const requests = selectedMembers.map(member => {
                const groupMemberData = {
                    group: teamID,
                    student: member.user_id
                };
                
                return axios.post('http://localhost:8000/userRegApi/create-groupMember/', groupMemberData)
                    .then(response => {
                        console.log('Successfully added student to group:', member.first_name, member.last_name);
                    })
                    .catch(error => {
                        console.error('Failed to add student to group:', member.first_name, member.last_name, error);
                    });

                });
            } catch (error) {
                console.error('An error occurred: ', error);
                alert('There was an issue registering your team');
            }

        setTeamID('');
        setTeamName('');
        setSelectedMembers([]);
        setSelectedClass('');
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
            const response = await axios.post('http://localhost:8000/userRegApi/import-roster/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Roster imported successfully');
            setCsvFile(null);
            fetchStudents(); // Refresh student list after import
        } catch (error) {
            console.error('Error importing roster:', error);
            alert('There was an issue importing the roster');
        }
    };

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

    useEffect(() => {
        axios.get(`http://localhost:8000/userRegApi/get-courses/${instructorId}/`, {
            withCredentials: true
        })
        .then(response => {
            const classCodes = response.data.map(course => course.course_code);
            setClasses(classCodes);     

        })
        .catch(err => {
            console.error("error fetching instructor classes:", err);
        });
        
    }, []);
  

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
            <div className="flex-grow ml-64 p-8 pt-20">
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


                <h1 className="text-3xl font-bold text-black mt-12 mb-14 text-center">Create A New Team</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div> 
                    <label htmlFor='selectedClass' className="block text-sm font-medium">Select a course</label>
                    <select
                        id="selectedClass"
                        value={selectedClass} // Bind the value to selectedClass
                        onChange={(e) => 
                            {
                                console.log('Chosen value:', e.target.value);
                                setSelectedClass(e.target.value) // Update selectedClass when the user selects a new option
                                console.log('Selected class:', e.target.value);
                            }
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select a class</option>
                        {classes.map((classCode, index) => (
                            <option key={classCode || index} value={classCode}>
                                {classCode}
                            </option>
                        ))}
                    </select>
                </div>

                    <div>
                    <label htmlFor='teamID' className="block text-sm font-medium">Team ID</label>
                    <input
                            type="text"
                            id="teamID"
                            value={teamID}
                            onChange={(e) => setTeamID(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="teamName" className="block text-sm font-medium">Team Name</label>
                        <input
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Selected Members</label>
                        <ul className="space-y-2">
                            {selectedMembers.map(member => (
                                <li key={member.user_id} className="flex justify-between p-2 bg-blue-100 rounded-md">
                                    {`${member.first_name} ${member.last_name}`}
                                    <button
                                        className="text-red-500"
                                        onClick={() => handleRemoveMember(member)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Create Team
                    </button>
                    <div>
                        <label className="block text-sm font-medium">Available Members</label>
                        <div className="space-y-4">
                            <ul className="space-y-2">
                                {students.map(student => (
                                    <li
                                        key={student.user_id}
                                        className="cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                        onClick={() => handleAddMember(student)}
                                    >
                                        {`${student.first_name} ${student.last_name}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>

                {/* CSV Import Form */}
                <form onSubmit={handleCsvSubmit} className="mt-8 space-y-4">
                    <h3 className="text-xl font-bold mb-2">Import Course Roster</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleCsvChange}
                        className="block w-full text-sm text-gray-500"
                    />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
                        Upload Roster
                    </button>
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4 w-full fixed bottom-0">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default CreateTeams;