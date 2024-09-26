import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButton = ({ results }) => {
  const headers = [
    { label: "Team", key: "team" },
    { label: "Student", key: "student" },
    { label: "Score", key: "score" },
    { label: "Feedback", key: "feedback" }
  ];

  return (
    <div>
      <h3>Export Results</h3>
      <CSVLink data={results} headers={headers} filename={"peer_assessment_results.csv"}>
        Download CSV
      </CSVLink>
    </div>
  );
};

export default ExportButton;