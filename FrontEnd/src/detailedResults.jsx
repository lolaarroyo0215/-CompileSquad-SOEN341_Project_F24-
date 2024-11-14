import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const DetailedResults = () => {
    const navigate = useNavigate();

    // Sample data for teams and assessment results
    const teams = [
        {
            teamName: 'Team Alpha',
            members: [
                {
                    studentId: '40258963',
                    lastName: 'Doe',
                    firstName: 'John',
                    cooperation: '5',
                    contribution: '4',
                    practical: '5',
                    workEthic: '5',
                    comment: 'Great team player, consistent work, excellent in implementation, hardworking and reliable.'
                },
                {
                    studentId: '40259313',
                    lastName: 'Smith',
                    firstName: 'Jane',
                    cooperation: '4',
                    contribution: '5',
                    practical: '4',
                    workEthic: '4',
                    comment: 'Good communicator, above average contribution, needs improvement in execution, decent, could be more proactive.'
                },
                {
                    studentId: '40351234',
                    lastName: 'Taylor',
                    firstName: 'Emma',
                    cooperation: '4',
                    contribution: '4',
                    practical: '4',
                    workEthic: '4',
                    comment: 'Collaborates well but could be more proactive, average contribution, needs to apply theory more effectively, could improve focus.'
                },
                {
                    studentId: '40561245',
                    lastName: 'White',
                    firstName: 'James',
                    cooperation: '5',
                    contribution: '5',
                    practical: '5',
                    workEthic: '5',
                    comment: 'Very helpful in group settings, always contributes great ideas, excellent implementation skills, outstanding work ethic and time management.'
                },
            ],
        },
        {
            teamName: 'Team Beta',
            members: [
                {
                    studentId: '40746548',
                    lastName: 'Johnson',
                    firstName: 'Alice',
                    cooperation: '5',
                    contribution: '5',
                    practical: '5',
                    workEthic: '5',
                    comment: 'Excellent cooperation with the team, consistently contributes great ideas, flawless execution of tasks, always on time, high work ethic.'
                },
                {
                    studentId: '40596861',
                    lastName: 'Brown',
                    firstName: 'Bob',
                    cooperation: '4',
                    contribution: '4',
                    practical: '5',
                    workEthic: '4',
                    comment: 'Good work in group settings, reliable contributor, great with practical tasks, needs to improve timeliness.'
                },
                {
                    studentId: '40671234',
                    lastName: 'Miller',
                    firstName: 'Sophia',
                    cooperation: '4',
                    contribution: '5',
                    practical: '4',
                    workEthic: '5',
                    comment: 'Great communicator, involves in brainstorming sessions, good at implementation, shows excellent dedication.'
                },
                {
                    studentId: '40742356',
                    lastName: 'Davis',
                    firstName: 'Liam',
                    cooperation: '5',
                    contribution: '4',
                    practical: '4',
                    workEthic: '5',
                    comment: 'Works well with the team, contributes regularly, can improve with some aspects, excellent commitment.'
                },
            ],
        },
    ];

    const [openTeam, setOpenTeam] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("student_id");
        navigate('/');
    }

    // Function to toggle a team's dropdown
    const toggleTeam = (teamName) => {
        setOpenTeam(openTeam === teamName ? null : teamName);
        setSelectedStudent(null); // Reset student selection when toggling teams
    };

    // Function to handle student selection
    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
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

                {/* Displaying teams and dropdown for members */}
                <div className="space-y-4">
                    {teams.map((team, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleTeam(team.teamName)}
                                className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
                            >
                                {team.teamName}
                            </button>

                            {openTeam === team.teamName && (
                                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                                    <ul>
                                        {team.members.map((member, idx) => (
                                            <li 
                                                key={idx}
                                                className="cursor-pointer py-2 px-4 hover:bg-slate-100"
                                                onClick={() => handleStudentSelect(member)}
                                            >
                                                {member.firstName} {member.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Display selected student's grades */}
                {selectedStudent && (
                    <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-black mb-4">{`${selectedStudent.firstName} ${selectedStudent.lastName}'s Results`}</h2>

                        <table className="table-auto w-full text-left border-collapse">
                            <thead className="bg-red-900 text-white">
                                <tr>
                                    <th className="px-4 py-2 border">Teammate</th>
                                    <th className="px-4 py-2 border">Cooperation</th>
                                    <th className="px-4 py-2 border">Conceptual Contribution</th>
                                    <th className="px-4 py-2 border">Practical Contribution</th>
                                    <th className="px-4 py-2 border">Work Ethic</th>
                                    <th className="px-4 py-2 border">Average</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedStudent && teams
                                    .find(t => t.teamName === openTeam)
                                    .members.filter(m => m.studentId !== selectedStudent.studentId)
                                    .map((member, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-2 border">{member.firstName} {member.lastName}</td>
                                            <td className="px-4 py-2 border">{member.cooperation}</td>
                                            <td className="px-4 py-2 border">{member.contribution}</td>
                                            <td className="px-4 py-2 border">{member.practical}</td>
                                            <td className="px-4 py-2 border">{member.workEthic}</td>
                                            <td className="px-4 py-2 border">{(
                                                (parseFloat(member.cooperation) +
                                                    parseFloat(member.contribution) +
                                                    parseFloat(member.practical) +
                                                    parseFloat(member.workEthic)) /
                                                4
                                            ).toFixed(2)}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {/* Comments section */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg">Comments:</h3>
                            {teams.find(t => t.teamName === openTeam).members.filter(m => m.studentId !== selectedStudent.studentId).map((member, idx) => (
                                <p key={idx} className="text-gray-600">
                                    <strong>{member.firstName} {member.lastName}:</strong> {member.comment}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4 w-full fixed bottom-0">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DetailedResults;