import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './index.css';

function handleLogout(){
    const navigate = useNavigate();
    navigate('/');
};

export default function AssessmentResultsPage() {
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

    // Function to toggle a team's dropdown
    const toggleTeam = (teamName) => {
        setOpenTeam(openTeam === teamName ? null : teamName);
    };


    return (

        <div className="bg-slate-200 min-h-screen flex flex-col">
            <nav className="bg-red-900 p-4 flex justify-between items-center">
                <div className="text-white text-lg">
                    {/* Logo image */}
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                </div>
                <div className="flex space-x-10">
                    <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
                    <span className="text-white hover:text-red-950 cursor-pointer"><button onClick={handleLogout()}>Log Out</button></span>
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
            </div>




            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}