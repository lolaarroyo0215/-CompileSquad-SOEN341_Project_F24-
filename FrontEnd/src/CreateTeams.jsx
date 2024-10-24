import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';


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

export default function CreateTeams() {

    const navigate = useNavigate();

    // State variables to manage team creation
    const [teamName, setTeamName] = useState(''); // Team name input
    const [selectedMembers, setSelectedMembers] = useState([]); // Selected team members
    const [selectedClass, setSelectedClass] = useState(''); // Selected class for team members
    const [allTeams, setAllTeams] = useState([]); // State to track all teams created

    function handleLogout(event) {
        event.preventDefault();
        navigate('/');
    }

    // Function to add a member to the selected team members
    const handleAddMember = (student) => {
        // Check if the member is already selected
        if (!selectedMembers.includes(student)) {
            // Allow addition if no members are selected or if the member's class matches the selected class
            if (selectedMembers.length === 0 || student.class === selectedClass) {
                setSelectedMembers([...selectedMembers, student]); // Add member to the selected list
                setSelectedClass(student.class); // Set the selected class
            } else {
                alert('All team members must be from the same class.'); // Alert if classes do not match
            }
        }
    };

    // Function to remove a member from the selected team members
    const handleRemoveMember = (student) => {
        setSelectedMembers(selectedMembers.filter(member => member.id !== student.id)); // Remove the member from the list
        // Clear selected class if the last member is removed
        if (selectedMembers.length === 1) setSelectedClass('');
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const teamMembersNames = selectedMembers.map(member => member.name); // Get names of selected members
        console.log("Team Name:", teamName);
        console.log("Members:", teamMembersNames);
        alert('Team created successfully!'); // Alert on successful team creation

        // Add the new team to the allTeams state
        setAllTeams([...allTeams, { teamName, members: selectedMembers }]);

        // Reset the team name and selected members after team creation
        setTeamName('');
        setSelectedMembers([]);
        setSelectedClass('');
    };

    // Group students by class for display
    const groupedStudents = students.reduce((acc, student) => {
        if (!acc[student.class]) {
            acc[student.class] = []; // Create a new array for each class
        }
        acc[student.class].push(student); // Push student into their respective class array
        return acc;
    }, {});

    // Create a new list of available members by filtering out selected members and those in all teams
    const availableMembers = Object.keys(groupedStudents).reduce((acc, className) => {
        acc[className] = groupedStudents[className].filter(student => 
            !selectedMembers.some(selected => selected.id === student.id) && // Filter out already selected members
            !allTeams.some(team => team.members.some(member => member.id === student.id)) // Check if student is in any team
        );
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
                    <span className="text-white hover:text-red-950 cursor-pointer"></span>
                    <button type='button' onClick={handleLogout} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log Out</button>
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
                            onChange={(e) => setTeamName(e.target.value)} // Update team name state on input change
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required // Make this field required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Selected Members</label>
                        <ul className="space-y-2">
                            {selectedMembers.map(member => (
                                <li
                                    key={member.id}
                                    className="flex justify-between p-2 bg-blue-100 rounded-md"
                                >
                                    {member.name} - {member.class}
                                    <button
                                        className="text-red-500"
                                        onClick={() => handleRemoveMember(member)} // Remove member on button click
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
                            {Object.keys(availableMembers).map(className => (
                                <div key={className}>
                                    <h3 className="font-bold">{className}</h3>
                                    <ul className="space-y-2">
                                        {availableMembers[className].map(student => (
                                            <li
                                                key={student.id}
                                                className="cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                                onClick={() => handleAddMember(student)} // Add member on click
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