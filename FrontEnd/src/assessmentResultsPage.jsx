import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function AssessmentResultsPage() {

    const navigate = useNavigate();

    // Sample data for teams and assessment results before database link 
    const teams = [
        {
            teamName: 'Team Alpha',
            members: [
                { name: 'John Doe', cooperation: '5', contribution: '4', practical: '5', workEthic: '5' },
                { name: 'Jane Smith', cooperation: '4', contribution: '5', practical: '4', workEthic: '4' },
            ],
        },
        {
            teamName: 'Team Beta',
            members: [
                { name: 'Alice Johnson', cooperation: '5', contribution: '5', practical: '5', workEthic: '5' },
                { name: 'Bob Brown', cooperation: '4', contribution: '4', practical: '5', workEthic: '4' },
            ],
        },
    ];

    const [openTeam, setOpenTeam] = useState(null);

    function handleLogout(event) {
        event.preventDefault();
        navigate('/');
    }

    function goToProfile(event) {
        event.preventDefault();
        navigate('/profile');
    }

    // Function to toggle a team's dropdown
    const toggleTeam = (teamName) => {
        setOpenTeam(openTeam === teamName ? null : teamName);
    };

    // Function to export results as CSV
    const exportToCSV = () => {
        const csvRows = [];
        const headers = ['Team Name', 'Member', 'Cooperation', 'Contribution', 'Practical', 'Work Ethic'];
        csvRows.push(headers.join(','));

        teams.forEach(team => {
            team.members.forEach(member => {
                const row = [team.teamName, member.name, member.cooperation, member.contribution, member.practical, member.workEthic];
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

    return (
        <div className="bg-slate-200 min-h-screen flex flex-col">
            <nav className="bg-red-900 p-4 flex justify-between items-center">
                <div className="text-white text-lg">
                    {/* Logo image */}
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                </div>
                <div className="flex space-x-10">
                    <button type='button' onClick={goToProfile} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Profile</button>
                    <button type='button' onClick={handleLogout} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log Out</button>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex-grow p-8">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">Assessment Results</h1>

                {teams.map((team, index) => (
                    <div key={index} className="mb-6">
                        {/* Dropdown toggle button for each team */}
                        <button
                            onClick={() => toggleTeam(team.teamName)}
                            className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
                        >
                            {team.teamName}
                        </button>

                        {/* Team member assessment results dropdown */}
                        {openTeam === team.teamName && (
                            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                                <table className="table-auto w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2">Member</th>
                                            <th className="px-4 py-2 text-center">Cooperation</th>
                                            <th className="px-4 py-2 text-center">Contribution</th>
                                            <th className="px-4 py-2 text-center">Practical</th>
                                            <th className="px-4 py-2 text-center">Work Ethic</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {team.members.map((member, idx) => (
                                            <tr key={idx} className="border-b">
                                                <td className="px-4 py-2">{member.name}</td>
                                                <td className="px-4 py-2 text-center">{member.cooperation}</td>
                                                <td className="px-4 py-2 text-center">{member.contribution}</td>
                                                <td className="px-4 py-2 text-center">{member.practical}</td>
                                                <td className="px-4 py-2 text-center">{member.workEthic}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}

                {/* Export button */}

                <div className="flex justify-center mt-4">
                <button 
                    onClick={exportToCSV} 
                    className="mt-4 bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
                    Export Results
                </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}