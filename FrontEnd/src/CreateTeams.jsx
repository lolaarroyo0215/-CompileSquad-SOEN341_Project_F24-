import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import './index.css';

function CreateTeams() {
    const navigate = useNavigate();

    // Sample data for students
    const students = [
        { id: 1, name: "Alice Johnson", class: "ENGR 213" },
        { id: 2, name: "Bob Smith", class: "ENGR 213" },
        { id: 3, name: "Charlie Brown", class: "ENGR 213" },
        { id: 4, name: "Dana White", class: "ENGR 213" },
        { id: 5, name: "Harry Styles", class: "SOEN 341" },
        { id: 6, name: "Zayn Malik", class: "SOEN 341" },
        { id: 7, name: "Liam Payne", class: "SOEN 341" },
        { id: 8, name: "Louis Tomlinson", class: "SOEN 341" },
        { id: 9, name: "Niall Horan", class: "SOEN 341" },
        { id: 10, name: "Luke Hemmings", class: "SOEN 331" },
        { id: 11, name: "Calum Hood", class: "SOEN 331" },
        { id: 12, name: "Michael Clifford", class: "SOEN 331" },
        { id: 13, name: "Ashton Irwin", class: "SOEN 331" },
        { id: 14, name: "Carlos Sainz", class: "ENCS 282" },
        { id: 15, name: "Lando Norris", class: "ENCS 282" },
        { id: 16, name: "Lewis Hamilton", class: "ENCS 282" },
        { id: 17, name: "Charles Leclerc", class: "ENCS 282" },
        { id: 18, name: "Max Verstappen", class: "ENCS 282" },
    ];

    const [teamName, setTeamName] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

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
        setSelectedMembers(selectedMembers.filter(member => member.id !== student.id));
        if (selectedMembers.length === 1) setSelectedClass('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!teamName || selectedMembers.length === 0 || !selectedClass) {
            alert('All fields are required');
            return;
        }
    
        try {
            const userData = {
                team_name: teamName,
                selected_members: selectedMembers.map(member => member.name).join(', '), // Convert to a comma-separated string
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
    
        // Clear team state after creation attempt
        setTeamName('');
        setSelectedMembers([]);
        setSelectedClass('');
    };
    

    const groupedStudents = students.reduce((acc, student) => {
        if (!acc[student.class]) {
            acc[student.class] = [];
        }
        acc[student.class].push(student);
        return acc;
    }, {});

    return (
        <div className="bg-slate-200 min-h-screen flex flex-col">
            {/* Header */}
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
                                <li key={member.id} className="flex justify-between p-2 bg-blue-100 rounded-md">
                                    {member.name} - {member.class}
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
                            {Object.keys(groupedStudents).map(className => (
                                <div key={className}>
                                    <h3 className="font-bold">{className}</h3>
                                    <ul className="space-y-2">
                                        {groupedStudents[className].map(student => (
                                            <li
                                                key={student.id}
                                                className="cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                                onClick={() => handleAddMember(student)}
                                            >
                                                {student.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default CreateTeams;
