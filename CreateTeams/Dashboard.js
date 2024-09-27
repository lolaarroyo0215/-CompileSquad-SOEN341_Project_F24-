import React, { useState } from 'react';
import TeamCreation from './TeamCreation';
import ResultsTable from './ResultsTable';
import ExportButton from './ExportButton';
import './Dashboard.css'; // Import the CSS for styling

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [results, setResults] = useState([]);

  const handleTeamCreation = (team) => {
    setTeams([...teams, team]);
  };

  const handleAddResults = (newResults) => {
    setResults([...results, ...newResults]);
  };

  return (
    <div className="dashboard-container">
      <h2>Teams</h2>
      <TeamCreation onTeamCreate={handleTeamCreation} />
      <ResultsTable teams={teams} results={results} />
      <ExportButton results={results} />
    </div>
  );
};

export default Dashboard;
