import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AssessmentResultsPage() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all students
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/userRegApi/get_students/');
            const studentsData = response.data;
            console.log("Fetched students:", studentsData);
            setStudents(studentsData);
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Failed to load student data');
            setLoading(false);
        }
    };

    // Fetch evaluations for each student
    const fetchEvaluationsForStudents = async () => {
        try {
            const evaluationData = [];
            for (const student of students) {
                if (student.user_id) {
                    const response = await axios.get(`http://localhost:8000/userRegApi/get-evaluations/${student.user_id}/1/`, {
                        withCredentials: true
                    });
                    console.log(`Evaluations for student ${student.user_id}:`, response.data);
                    evaluationData.push({ studentId: student.user_id, evaluations: response.data });
                }
            }
            console.log("All evaluations data:", evaluationData);
            setEvaluations(evaluationData);
        } catch (error) {
            console.error('Error fetching evaluations:', error.response || error.message || error);
            setError('Failed to load evaluations data');
        }
    };

    // Fetch groups for each student
    const fetchGroupsForStudents = async () => {
        try {
            const groupData = [];
            for (const student of students) {
                if (student.user_id) {
                    const response = await axios.get(`http://localhost:8000/userRegApi/get-studentsGroups/${student.user_id}/`, {
                        withCredentials: true
                    });
                    console.log(`Groups for student ${student.user_id}:`, response.data);
                    groupData.push({ studentId: student.user_id, groups: response.data });
                }
            }
            console.log("All groups data:", groupData);
            setGroups(groupData);
        } catch (error) {
            console.error('Error fetching groups:', error.response || error.message || error);
            setError('Failed to load group data');
        }
    };

    // Calculate average ratings
    const calculateAverage = (ratings) => {
        const validRatings = ratings.filter(rating => rating != null);
        if (validRatings.length === 0) return 0;
        const sum = validRatings.reduce((total, rating) => total + rating, 0);
        return (sum / validRatings.length).toFixed(2);
    };

    // Fetch students on component mount
    useEffect(() => {
        const fetchData = async () => {
            await fetchStudents();
        };
        fetchData();
    }, []);

    // Fetch evaluations and groups after students are fetched
    useEffect(() => {
        const fetchAdditionalData = async () => {
            if (students.length > 0) {
                await fetchEvaluationsForStudents();
                await fetchGroupsForStudents();
            }
        };
        fetchAdditionalData();
    }, [students]);

    // Combine all data once students, evaluations, and groups are fetched
    useEffect(() => {
        if (students.length > 0 && evaluations.length > 0 && groups.length > 0) {
            const combinedData = students.map(student => {
                const studentEvaluations = evaluations.find(evaluation => evaluation.studentId === student.user_id);
                const studentGroupsData = groups.find(group => group.studentId === student.user_id);

                // Extract group names
                const groupNames = studentGroupsData ? studentGroupsData.groups.map(groupMember => groupMember.group.group_name) : [];

                const cooperationRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.cooperation_rating) : [];
                const conceptualRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.conceptualContribution_rating) : [];
                const practicalRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.practicalContribution_rating) : [];
                const workEthicRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.workEthic_rating) : [];

                const averageCooperation = calculateAverage(cooperationRatings);
                const averageConceptual = calculateAverage(conceptualRatings);
                const averagePractical = calculateAverage(practicalRatings);
                const averageWorkEthic = calculateAverage(workEthicRatings);

                return {
                    studentId: student.user_id,
                    firstName: student.first_name,
                    lastName: student.last_name,
                    groups: groupNames,
                    evaluations: studentEvaluations ? studentEvaluations.evaluations : [],
                    averageCooperation,
                    averageConceptual,
                    averagePractical,
                    averageWorkEthic
                };
            });
            setStudentData(combinedData);
            setLoading(false);
        }
    }, [students, evaluations, groups]);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("student_id");
        navigate('/');
    };

    // Navigate to detailed results page
    const goToDetailedResults = () => {
        navigate('/detailedResults');
    };

    return (
        <div className="flex min-h-screen bg-slate-200">
            <div className="w-64 bg-gray-200 text-black p-5 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900">
                <ul className="mt-20">
                    <li className="mb-4"><a href="/profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Profile</a></li>
                    <li className="mb-4"><a href="/teacher" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">My Dashboard</a></li>
                    <li className="mb-4"><a href="/create-classes" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Create class</a></li>
                    <li className="mb-4"><a href="/create-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Create Teams</a></li>
                    <li className="mb-4"><a href="/current-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Current Teams</a></li>
                    <li className="mb-4"><a href="/assessment-results" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Assessment Results</a></li>
                </ul>
                <ul className='p-3 mt-8'>
                    <img src='/img/concordialogo.png' alt='concordia-logo' />
                </ul>
            </div>

            <div className="flex-grow ml-64 p-8 pt-20">
                <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
                    <div className="text-white text-lg flex items-center">
                        <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                    </div>
                    <div className="flex items-center space-x-6">
                        <span className="text-white hover:text-red-950 cursor-pointer py-2 px-4 text-sm font-medium bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
                            Profile
                        </span>
                        <button 
                            type='button' 
                            onClick={handleLogout} 
                            className="py-2 px-4 text-sm font-medium text-white bg-red-900 hover:bg-red-950 rounded-lg">
                            Logout
                        </button>
                    </div>
                </nav>

                <h1>Assessment Results</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && studentData.length === 0 && <p>No data found for students.</p>}

                {/* Display combined data in a tabular format */}
                {!loading && !error && studentData.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-4 py-2">Student Name</th>
                                    <th className="px-4 py-2">Group</th>
                                    <th className="px-4 py-2">Cooperation Rating</th>
                                    <th className="px-4 py-2">Conceptual Rating</th>
                                    <th className="px-4 py-2">Practical Rating</th>
                                    <th className="px-4 py-2">Work Ethic Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map(({ studentId, firstName, lastName, groups, averageCooperation, averageConceptual, averagePractical, averageWorkEthic }) => (
                                    <tr key={studentId} className="bg-white border-b">
                                        <td className="px-4 py-2">{firstName} {lastName}</td>
                                        <td className="px-4 py-2">
                                            {groups.map(groupName => groupName).join(', ')}
                                        </td>
                                        <td className="px-4 py-2">{averageCooperation}</td>
                                        <td className="px-4 py-2">{averageConceptual}</td>
                                        <td className="px-4 py-2">{averagePractical}</td>
                                        <td className="px-4 py-2">{averageWorkEthic}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Export button and View Detailed Results button */}
                <div className="flex justify-center mt-4 space-x-4">
                    <button 
                        onClick={goToDetailedResults} 
                        className="mt-4 bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
                        View Detailed Results
                    </button>
                </div>

            </div>
            
        </div>
    );
}

