import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function AssessmentResultsPage() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [evaluations, setEvaluations] = useState([]); // Array to store evaluations
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/userRegApi/get_students/');
            const studentsData = response.data;
            
            console.log("Fetched students:", studentsData); // Log students data
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
                if (student.id) {
                    const response = await axios.get(`http://localhost:8000/userRegApi/get-evaluations/${student.id}/1/`, {
                        withCredentials: true
                    });
                    console.log(`Evaluations for student ${student.id}:`, response.data); // Log each evaluation response
                    evaluationData.push({ studentId: student.id, evaluations: response.data });
                }
            }
            console.log("All evaluations data:", evaluationData); // Log all evaluations data
            setEvaluations(evaluationData);
        } catch (error) {
            console.error('Error fetching evaluations:', error.response || error.message || error);
            setError('Failed to load evaluations data');
        }
    };
    

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            fetchEvaluationsForStudents();
        }
    }, [students]);

    return (
        <div>
            <h1>Assessment Results</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && students.length === 0 && <p>No students found.</p>}
            {!loading && !error && evaluations.length === 0 && <p>No evaluations found for students.</p>}
            {!loading && !error && evaluations.length > 0 && (
                <div>
                    {evaluations.map(({ studentId, evaluations }) => (
                        <div key={studentId}>
                            <h2>Evaluations for Student ID: {studentId}</h2>
                            <ul>
                                {evaluations.map((evaluation, index) => (
                                    <li key={index}>
                                        {JSON.stringify(evaluation)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    
}
