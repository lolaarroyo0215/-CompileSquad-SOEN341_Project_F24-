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
import ConfirmationPage from './confirmationPage';
import Profile from './Profile';
import DetailedResults from './detailedResults';
import ClassCreationPage from './classCreationPage';


const ProtectedRoute = ({ element: Component, role, ...rest }) => {
    const token = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');

    if (token && userRole === role) {
        return <Component {...rest} />;
    } else {
        alert("You don’t have permission to access this page, please try login in.")
        return <Navigate to="/" />;
    }
};



function App() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Register />} />
                 <Route path="/create-account" element={<CreateAccount />} />
                 <Route path="/teacher" element={<ProtectedRoute element={MainTeacherPage} role="teacher" />} />
                 <Route path="/create-teams" element={<ProtectedRoute element={CreateTeams} role="teacher"/>} />
                 <Route path="/current-teams" element={<ProtectedRoute element={CurrentTeamsPage} role="teacher"/>} />
                 <Route path="/assessment-results" element={<ProtectedRoute element ={AssessmentResultsPage} role="teacher"/>} />
                 <Route path="/detailedResults" element={<ProtectedRoute element ={DetailedResults} role="teacher" />} />
                 <Route path="/create-classes" element={<ProtectedRoute element ={ClassCreationPage} role="teacher" />} />
                 <Route path="/student" element={<ProtectedRoute element={MainStudentPage} role="student" />} />
                 <Route path="/new-assessment/" element={<NewAssessmentPage />} />
                 <Route path="/view-my-grades" element={<ProtectedRoute element ={ViewMyGradesPage} role="student"/>} />
                 <Route path="/view-my-teams" element={<ProtectedRoute element ={ViewMyTeamsPage} role="student"/>} />
                 <Route path="/confirmation" element={<ProtectedRoute element ={ConfirmationPage} role="student" />} />
                 <Route path="/mainStudentPage" element={<ProtectedRoute element ={MainStudentPage} role="student" />} />
                 <Route path="/profile" element={<ProtectedRoute element ={Profile} role="student" />} />
                 <Route path="/courses/:courseId/current-teams" element={<CurrentTeamsPage />} />

                 

            </Routes>
        </BrowserRouter>
    );

}
export default App;