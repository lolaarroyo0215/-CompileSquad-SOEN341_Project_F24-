import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AssessmentResultsPage() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [evaluations, setEvaluations] = useState([]); // Array to store evaluations
    const [groups, setGroups] = useState([]); // Array to store groups
    const [studentData, setStudentData] = useState([]); // Array to store combined student data (groups + evaluations)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/userRegApi/get_students/');
            const studentsData = response.data;
            console.log("Fetched students:", studentsData);
            setStudents(studentsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Failed to load student data');
        }
    };

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

    const fetchGroupsForStudents = async () => {
        try {
            const groupData = [];
            for (const student of students) {
                if (student.user_id) {
                    const response = await axios.get(`http://localhost:8000/userRegApi/get-groupMembers/${student.user_id}/`, {
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

    // Calculate the average for each rating category
    const calculateAverage = (ratings) => {
        const validRatings = ratings.filter(rating => rating != null); // Remove null or undefined ratings
        if (validRatings.length === 0) return 0; // If no valid ratings, return 0
        const sum = validRatings.reduce((total, rating) => total + rating, 0);
        return (sum / validRatings.length).toFixed(2); // Return average with 2 decimal points
    };

    // Combine student, evaluation, and group data into a single array
    useEffect(() => {
        if (students.length > 0 && evaluations.length > 0 && groups.length > 0) {
            const combinedData = students.map(student => {
                const studentEvaluations = evaluations.find(evaluation => evaluation.studentId === student.user_id);
                const studentGroups = groups.find(group => group.studentId === student.user_id);

                // Calculate averages for each individual rating
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
                    groups: studentGroups ? studentGroups.groups : [],
                    evaluations: studentEvaluations ? studentEvaluations.evaluations.map(evaluation => ({
                        feedback: evaluation.feedback,
                        cooperation_rating: evaluation.cooperation_rating,
                        conceptualContribution_rating: evaluation.conceptualContribution_rating,
                        practicalContribution_rating: evaluation.practicalContribution_rating,
                        workEthic_rating: evaluation.workEthic_rating
                    })) : [],
                    averageCooperation,
                    averageConceptual,
                    averagePractical,
                    averageWorkEthic
                };
            });

            console.log("Combined student data:", combinedData);
            setStudentData(combinedData);
            setLoading(false);
        }
    }, [students, evaluations, groups]);

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            fetchEvaluationsForStudents();
            fetchGroupsForStudents();
        }
    }, [students]);

    return (
        <div>
            <h1>Assessment Results</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && students.length === 0 && <p>No students found.</p>}
            {!loading && !error && studentData.length === 0 && <p>No data found for students.</p>}
            
            {/* Display combined data */}
            {!loading && !error && studentData.length > 0 && (
                <div>
                    {studentData.map(({ studentId, firstName, lastName, groups, evaluations, averageCooperation, averageConceptual, averagePractical, averageWorkEthic }) => (
                        <div key={studentId}>
                            <h2> <br/> <br/> Student: {firstName} {lastName} (ID: {studentId})</h2>
                            <h3>Groups:</h3>
                            <ul>
                                {groups.length > 0 ? groups.map((group, index) => (
                                    <li key={index}>{group.group}</li> // Adjust based on your group object structure
                                )) : <li>No groups assigned</li>}
                            </ul>
                            <h3>Evaluations:</h3>
                            <ul>
                                <li>Cooperation Rating: {averageCooperation}</li>
                                <li>Conceptual Rating: {averageConceptual}</li>
                                <li>Practical Rating: {averagePractical}</li>
                                <li>Work Ethic Rating: {averageWorkEthic}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
