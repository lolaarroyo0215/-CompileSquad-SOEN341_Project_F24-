import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AssessmentResultsPage() {
    const navigate = useNavigate();
    const instructorId = localStorage.getItem("instructor_id");

    const [coursesData, setCoursesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [openCourse, setOpenCourse] = useState(null); // For expanding courses
    const [openGroup, setOpenGroup] = useState(null);   // For expanding groups
    const [openStudent, setOpenStudent] = useState(null); // For expanding students
    const [evaluations, setEvaluations] = useState({}); // Store evaluations per student

    useEffect(() => {
        if (!instructorId) {
            setError("Instructor ID is not available.");
            setLoading(false);
            return;
        }
    
        axios
            .get(`http://localhost:8000/userRegApi/get-courses/${instructorId}/`, {
                withCredentials: true,
            })
            .then((response) => {
                const courses = response.data.map((item) => item.course_code);
    
                const courseRequests = courses.map((course) =>
                    axios
                        .get(`http://localhost:8000/userRegApi/get-groups/${course}/`, {
                            withCredentials: true,
                        })
                        .then((groupResponse) => {
                            const groups = groupResponse.data.map((groupItem) => groupItem.group_code);
    
                            const groupRequests = groups.map((group) =>
                                axios
                                    .get(`http://localhost:8000/userRegApi/get-groupMembers/${group}/`, {
                                        withCredentials: true,
                                    })
                                    .then((memberResponse) => {
                                        const members = memberResponse.data.map((member) => ({
                                            student_id: member.student,
                                        }));
    
                                        // Fetch evaluations for all members in the group
                                        const evaluationRequests = members.map((member) =>
                                            axios
                                                .get(`http://localhost:8000/userRegApi/get-evaluations/${member.student_id}/${group}`, {
                                                    withCredentials: true,
                                                })
                                                .then((evaluationResponse) => {
                                                    const data = evaluationResponse.data;
        
                                                    // Map evaluations to include all necessary details
                                                    const evaluationDetails = data.map((evaluation) => ({
                                                        evaluator_id: evaluation.evaluator,
                                                        cooperation_rating: evaluation.cooperation_rating,
                                                        conceptualContribution_rating: evaluation.conceptualContribution_rating,
                                                        practicalContribution_rating: evaluation.practicalContribution_rating,
                                                        workEthic_rating: evaluation.workEthic_rating,
                                                        feedback: evaluation.feedback,
                                                    }));
                                                    // console.log(`Student ID: ${member.student_id}$`);
                                                    // console.log(`Evaluation Details: ${JSON.stringify(evaluationDetails, null, 2)}$`);



                                                    return {
                                                        student_id: member.student_id,
                                                        evaluations: evaluationDetails, // Evaluations for the current student
                                                    };
                                                })
                                        );
    
                                        return Promise.all(evaluationRequests).then((evaluations) => ({
                                            group,
                                            members: members.map((member) => ({
                                                ...member,
                                                evaluations: evaluations.find((e) => e.student_id === member.student_id),
                                            })),
                                        }));
                                    })
                            );
    
                            return Promise.all(groupRequests).then((groupsWithMembersAndEvaluations) => ({
                                course,
                                groups: groupsWithMembersAndEvaluations,
                            }));
                        })
                );
    
                Promise.all(courseRequests).then((finalData) => {
                    setCoursesData(finalData);
                    setLoading(false);
                });
            })
            .catch((err) => {
                setError("Failed to load data.");
                setLoading(false);
                console.error(err);
            });
    }, [instructorId]);
    

    // Toggle functions for expanding menus
    const toggleCourse = (course) => {
        setOpenCourse(openCourse === course ? null : course);
        setOpenGroup(null);
        setOpenStudent(null);
    };

    const toggleGroup = (group) => {
        setOpenGroup(openGroup === group ? null : group);
        setOpenStudent(null);
    };

    const toggleStudent = (studentId) => {
        setOpenStudent(openStudent === studentId ? null : studentId);
   //     fetchEvaluations(studentId); // Fetch evaluations on expansion
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

   return (
    <div className="flex min-h-screen bg-slate-200">
        {/* Side Menu */}
        <div className="w-64 bg-gray-200 text-black p-5 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900">
            <ul className="mt-20">
                <li className="mb-4">
                    <a href="/profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        Profile
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/teacher" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        My Dashboard
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/create-classes" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        Create Class
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/create-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        Create Teams
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/current-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        Current Teams
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/assessment-results" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        Assessment Results
                    </a>
                </li>
            </ul>
            <ul className="p-3 mt-8">
                <img src="/img/concordialogo.png" alt="concordia-logo" />
            </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow ml-64 p-8 pt-20">
            {/* Top Navigation */}
            <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
                <div className="text-white text-lg flex items-center">
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                </div>
                <div className="flex items-center space-x-6">
                    <span className="text-white hover:text-red-950 cursor-pointer py-2 px-4 text-sm font-medium bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
                        Profile
                    </span>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="py-2 px-4 text-sm font-medium text-white bg-red-900 hover:bg-red-950 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <h1 className="text-3xl font-bold text-black mb-6 text-center mt-16">
                Detailed Results by Course
            </h1>

            {/* Content with Courses, Groups, and Students */}
            {coursesData.map((courseItem, courseIndex) => (
                <div key={courseIndex} className="mb-6">
                    {/* Top Layer: Courses */}
                    <button
                        onClick={() => toggleCourse(courseItem.course)}
                        className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
                    >
                        {courseItem.course}
                    </button>

                    {openCourse === courseItem.course && (
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                            {courseItem.groups.map((groupItem, groupIndex) => (
                                <div key={groupIndex} className="mb-4">
                                    {/* Second Layer: Groups */}
                                    <button
                                        onClick={() => toggleGroup(groupItem.group)}
                                        className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded focus:outline-none text-left"
                                    >
                                        {groupItem.group}
                                    </button>

                                    {openGroup === groupItem.group && (
                                        <div className="mt-2 bg-white p-4 rounded-lg shadow-sm">
                                            <ul>
                                                {/* Third Layer: Students */}
                                                {groupItem.members.map((member, memberIndex) => (
                                                    <li key={memberIndex} className="py-1 px-2 border-b last:border-b-0">
                                                        <button
                                                            onClick={() => toggleStudent(member.student_id)}
                                                            className="text-left w-full"
                                                        >
                                                            {member.name} (ID: {member.student_id})
                                                        </button>

                                                        {openStudent === member.student_id && member.evaluations && (
                                                            <div className="mt-2 p-2 bg-gray-100 rounded shadow-sm">
                                                                <h3 className="font-semibold">Evaluations from Teammates</h3>
                                                                <table className="min-w-full bg-white">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="py-2 px-4 border-b">Evaluator ID</th>
                                                                            <th className="py-2 px-4 border-b">Cooperation Rating</th>
                                                                            <th className="py-2 px-4 border-b">Conceptual Contribution Rating</th>
                                                                            <th className="py-2 px-4 border-b">Practical Contribution Rating</th>
                                                                            <th className="py-2 px-4 border-b">Work Ethic Rating</th>
                                                                            <th className="py-2 px-4 border-b">Feedback</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {member.evaluations.evaluations.map((evaluation, index) => (
                                                                            <tr key={index}>
                                                                                <td className="py-2 px-4 border-b">{evaluation.evaluator_id}</td>
                                                                                <td className="py-2 px-4 border-b">{evaluation.cooperation_rating}</td>
                                                                                <td className="py-2 px-4 border-b">{evaluation.conceptualContribution_rating}</td>
                                                                                <td className="py-2 px-4 border-b">{evaluation.practicalContribution_rating}</td>
                                                                                <td className="py-2 px-4 border-b">{evaluation.workEthic_rating}</td>
                                                                                <td className="py-2 px-4 border-b">{evaluation.feedback}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            ))}

            {/* View Detailed Results Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => navigate('/assessment-results')}
                    className="bg-red-900 text-white py-2 px-6 rounded-lg hover:bg-red-950 shadow-md"
                >
                    View Summary of Results
                </button>
            </div>
        </div>
    </div>
);
                                                                    }


