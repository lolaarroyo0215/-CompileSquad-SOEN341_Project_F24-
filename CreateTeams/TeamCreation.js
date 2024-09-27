import React, { useState } from 'react';
import './TeamCreation.css'; // Import the CSS for styling

const TeamCreation = ({ onTeamCreate }) => {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      teamName,
      members: members.split(',').map(member => member.trim()) // Split and trim member names
    };
    onTeamCreate(newTeam); // Pass the new team to the parent component
    setTeamName(''); // Clear input after submission
    setMembers('');  // Clear input after submission
  };

  return (
    <div className="team-creation-container">
      <h3>Create a New Team</h3>
      <p className="instructions">
        Enter the team name and team members (comma-separated).
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)} // Update team name state
          required
        />
        <input
          type="text"
          placeholder="Team Members"
          value={members}
          onChange={(e) => setMembers(e.target.value)} // Update members state
          required
        />
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default TeamCreation;
