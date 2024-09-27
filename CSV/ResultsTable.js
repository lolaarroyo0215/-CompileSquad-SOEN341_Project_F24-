import React from 'react';

const PeerAssessmentResults = ({ results }) => {
  return (
    <div>
      <h3>Peer Assessment Results</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Team</th>
            <th>Student</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.team}</td>
              <td>{result.student}</td>
              <td>{result.score}</td>
              <td>{result.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeerAssessmentResults;
