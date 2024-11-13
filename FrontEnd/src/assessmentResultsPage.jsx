import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AssessmentResultsPage() {
    const navigate = useNavigate();

    // Sample data for teams and assessment results before database link
    const teams = [
        {
            teamName: 'Team Alpha',
            members: [
                { studentId: '40258963', lastName: 'Doe', firstName: 'John', cooperation: '5', contribution: '4', practical: '5', workEthic: '5' },
                { studentId: '40259313', lastName: 'Smith', firstName: 'Jane', cooperation: '4', contribution: '5', practical: '4', workEthic: '4' },
            ],
        },
        {
            teamName: 'Team Beta',
            members: [
                { studentId: '40746548', lastName: 'Johnson', firstName: 'Alice', cooperation: '5', contribution: '5', practical: '5', workEthic: '5' },
                { studentId: '40596861', lastName: 'Brown', firstName: 'Bob', cooperation: '4', contribution: '4', practical: '5', workEthic: '4' },
            ],
        },
    ];

    const [openTeam, setOpenTeam] = useState(null);

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("student_id");
        navigate('/');
    }

    // Function to toggle a team's dropdown
    const toggleTeam = (teamName) => {
        setOpenTeam(openTeam === teamName ? null : teamName);
    };

    // Function to export results as CSV
    const exportToCSV = () => {
        const csvRows = [];
        const headers = ['Student ID', 'Last Name', 'First Name', 'Team', 'Cooperation', 'Conceptual Contribution', 'Practical Contribution', 'Work Ethic', 'Average', 'Peers who Responded'];
        csvRows.push(headers.join(','));

        teams.forEach(team => {
            team.members.forEach(member => {
                const avg = (
                    (parseFloat(member.cooperation) + parseFloat(member.contribution) + parseFloat(member.practical) + parseFloat(member.workEthic)) / 4
                ).toFixed(2);
                const row = [
                    member.studentId, 
                    member.lastName, 
                    member.firstName, 
                    team.teamName, 
                    member.cooperation, 
                    member.contribution, 
                    member.practical, 
                    member.workEthic, 
                    avg, 
                    'N/A', // Placeholder for "Peers who responded"
                ];
                csvRows.push(row.join(','));
            });
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'assessment_results.csv');
        a.click();
    };

    // Navigate to detailed results page
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

                <h1 className="text-3xl font-bold text-black mt-12 mb-20 text-center">Summary of Assessment Results</h1>

                {teams.map((team, index) => (
                    <div key={index} className="mb-6">
                        <button
                            onClick={() => toggleTeam(team.teamName)}
                            className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
                        >
                            {team.teamName}
                        </button>

                        {openTeam === team.teamName && (
                            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                                <table className="table-auto w-full text-left border-collapse">
                                    <thead className="bg-red-900 text-white">
                                        <tr>
                                            <th className="px-4 py-2 border">Student ID</th>
                                            <th className="px-4 py-2 border">Last Name</th>
                                            <th className="px-4 py-2 border">First Name</th>
                                            <th className="px-4 py-2 border text-center">Cooperation</th>
                                            <th className="px-4 py-2 border text-center">Conceptual Contribution</th>
                                            <th className="px-4 py-2 border text-center">Practical Contribution</th>
                                            <th className="px-4 py-2 border text-center">Work Ethic</th>
                                            <th className="px-4 py-2 border text-center">Average</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {team.members.map((member, idx) => (
                                            <tr key={idx} className="border-b hover:bg-slate-100">
                                                <td className="px-4 py-2 border">{member.studentId}</td>
                                                <td className="px-4 py-2 border">{member.lastName}</td>
                                                <td className="px-4 py-2 border">{member.firstName}</td>
                                                <td className="px-4 py-2 border text-center">{member.cooperation}</td>
                                                <td className="px-4 py-2 border text-center">{member.contribution}</td>
                                                <td className="px-4 py-2 border text-center">{member.practical}</td>
                                                <td className="px-4 py-2 border text-center">{member.workEthic}</td>
                                                <td className="px-4 py-2 border text-center">{(
                                                    (parseFloat(member.cooperation) + parseFloat(member.contribution) + parseFloat(member.practical) + parseFloat(member.workEthic)) / 4
                                                ).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}

                {/* Export button and View Detailed Results button */}
                <div className="flex justify-center mt-4 space-x-4">
                    <button 
                        onClick={exportToCSV} 
                        className="mt-4 bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
                        Export Results
                    </button>
                    <button 
                        onClick={goToDetailedResults} 
                        className="mt-4 bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
                        View Detailed Results
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4 w-full fixed bottom-0">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}