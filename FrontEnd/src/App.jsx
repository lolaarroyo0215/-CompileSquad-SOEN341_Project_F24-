import React from 'react';
import Register from './Register';
import CreateAccount from './CreateAccount';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainTeacherPage from './mainTeacherPage';
import CurrentTeamsPage from './currentTeamsPage';
import AssessmentResultsPage from './assessmentResultsPage';
import MainStudentPage from './mainStudentPage';
import NewAssessmentPage from './newAssessmentPage';
import ViewMyGradesPage from './viewMyGradesPage';
import ViewMyTeamsPage from './viewMyTeamsPage';
import CreateTeams from './CreateTeams';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('access_token');
    return token ? <Component {...rest} /> : <Navigate to="/" />
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Register />} />
                 <Route path="/create-account" element={<CreateAccount />} />
                 <Route path="/create-teams" element={<ProtectedRoute element={CreateTeams} />} />
                 <Route path="/current-teams" element={<ProtectedRoute element={CurrentTeamsPage} />} />
                 <Route path="/assessment-results" element={<ProtectedRoute element ={AssessmentResultsPage} />} />
                 <Route path="/student" element={<ProtectedRoute element ={MainStudentPage} />} />
                 <Route path="/teacher" element={<ProtectedRoute element={MainTeacherPage} />} />
                 <Route path="/new-assessment" element={<ProtectedRoute element={NewAssessmentPage} />} />
                 <Route path="/view-my-grades" element={<ProtectedRoute element ={ViewMyGradesPage} />} />
                 <Route path="/view-my-teams" element={<ProtectedRoute element ={ViewMyTeamsPage} />} />
            </Routes>
        </BrowserRouter>
    );

}
export default App;

