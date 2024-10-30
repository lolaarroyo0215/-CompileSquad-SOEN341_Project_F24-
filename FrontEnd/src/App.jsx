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

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
    const token = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');
    return token && userRole === role ? <Component {...rest} /> : <Navigate to="/" />;
};



function App() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Register />} />
                 <Route path="/create-account" element={<CreateAccount />} />
                 <Route path="/create-teams" element={<ProtectedRoute element={CreateTeams} role="teacher"/>} />
                 <Route path="/current-teams" element={<ProtectedRoute element={CurrentTeamsPage} role="teacher"/>} />
                 <Route path="/assessment-results" element={<ProtectedRoute element ={AssessmentResultsPage} role="teacher"/>} />
                 <Route path="/student" element={<ProtectedRoute element={MainStudentPage} role="student" />} />
                 <Route path="/teacher" element={<ProtectedRoute element={MainTeacherPage} role="teacher" />} />
                 <Route path="/new-assessment" element={<ProtectedRoute element={NewAssessmentPage} role="student"/>} />
                 <Route path="/view-my-grades" element={<ProtectedRoute element ={ViewMyGradesPage} role="student"/>} />
                 <Route path="/view-my-teams" element={<ProtectedRoute element ={ViewMyTeamsPage} role="student"/>} />
            </Routes>
        </BrowserRouter>
    );

}
export default App;

