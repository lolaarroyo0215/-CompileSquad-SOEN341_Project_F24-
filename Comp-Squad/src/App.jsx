import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainTeacherPage from './mainTeacherPage';
import CurrentTeamsPage from './currentTeamsPage';
import AssessmentResultsPage from './assessmentResultsPage';
import MainStudentPage from './mainStudentPage';
import NewAssessmentPage from './newAssessmentPage';
import ViewMyGradesPage from './viewMyGradesPage';
import ViewMyTeamsPage from './viewMyTeamsPage';


{/* for student page */ }

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainStudentPage />} />
                <Route path="/new-assessment" element={<NewAssessmentPage />} />
                <Route path="/view-my-grades" element={<ViewMyGradesPage />} />
                <Route path="/view-my-teams" element={<ViewMyTeamsPage />} />



            </Routes>
        </Router>
    );
}

export default App;