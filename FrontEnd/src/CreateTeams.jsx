import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function CreateTeams() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [csvFile, setCsvFile] = useState(null);

    const handleLogout = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const handleAddMember = (student) => {
        if (!selectedMembers.includes(student)) {
            if (selectedMembers.length === 0 || student.class === selectedClass) {
                setSelectedMembers([...selectedMembers, student]);
                setSelectedClass(student.class);
            } else {
                alert('All team members must be from the same class.');
            }
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
            const userData = {
                team_name: teamName,
                selected_members: selectedMembers.map(member => `${member.first_name} ${member.last_name}`).join(', '),
                selected_class: selectedClass
            };
    
            const response = await axios.post('http://localhost:8000/userRegApi/create-team/', userData);
    
            if (response.status === 200 || response.status === 201) {
                alert('Successful team creation');
            } else {
                alert('Registration failed: ' + response.data.detail);
            }
        } catch (error) {
            console.error('An error occurred: ', error);
            alert('There was an issue registering your team');
        }
    
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

    return (
        <div className="bg-slate-200 min-h-screen flex flex-col">
            <nav className="bg-red-900 p-4 flex justify-between items-center">
                <div className="text-white text-lg">
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                </div>
                <div className="flex space-x-10">
                    <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
                    <button type='button' onClick={handleLogout} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">Log Out</button>
                </div>
            </nav>

            <div className="flex-grow p-8">
                <h2 className="text-2xl font-bold mb-4">Create a New Team</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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

            <footer className="bg-red-900 text-white text-right py-4 px-4">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default CreateTeams;
