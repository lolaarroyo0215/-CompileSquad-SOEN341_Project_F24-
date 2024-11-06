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

    return (
        <div className="bg-slate-200 min-h-screen flex flex-col">
            <nav className="bg-red-900 p-4 flex justify-between items-center">
                <div className="text-white text-lg flex items-center">
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                </div>
                <div className="flex items-center space-x-6">
                    <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
                    <button 
                        type='button' 
                        onClick={handleLogout} 
                        className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
                    >
                        Log Out
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex-grow p-8">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">Summary of Assessment Results</h1>

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