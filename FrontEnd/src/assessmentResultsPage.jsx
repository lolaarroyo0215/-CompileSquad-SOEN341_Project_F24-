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
                                                    console.log(evaluationResponse.data);
                                                    const categories = [
                                                        { key: "cooperation_rating", label: "Cooperation" },
                                                        { key: "conceptualContribution_rating", label: "Conceptual" },
                                                        { key: "practicalContribution_rating", label: "Practical" },
                                                        { key: "workEthic_rating", label: "Work Ethic" },
                                                    ];
                                                    
                                                    const averages = categories.map((category) => {
                                                        const ratings = data.map((evaluation) => evaluation[category.key]);
                                                        const validRatings = ratings.filter((rating) => rating != null);
                                                        const sum = validRatings.reduce((acc, val) => acc + val, 0);
                                                        return validRatings.length ? (sum / validRatings.length).toFixed(2) : "N/A";
                                                    });
                                                    
                                                    const feedback = data.map((evaluation) => evaluation.feedback);
    
                                                    return {
                                                        student_id: member.student_id,
                                                        averages,
                                                        feedback,
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
        fetchEvaluations(studentId); // Fetch evaluations on expansion
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
                Assessment Results by Course
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
                                                                <h3 className="font-semibold">Average Grades:</h3>
                                                                <ul className="mb-2">
                                                                    {["Cooperation", "Conceptual", "Practical", "Work Ethic"].map((category, i) => (
                                                                        <li key={i}>
                                                                            {category}: {member.evaluations.averages[i]}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                <h3 className="font-semibold">Feedback:</h3>
                                                                <ul>
                                                                    {member.evaluations.feedback.map((comment, i) => (
                                                                        <li key={i}>- {comment}</li>
                                                                    ))}
                                                                </ul>
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
                    onClick={() => navigate('/detailedResults')}
                    className="bg-red-900 text-white py-2 px-6 rounded-lg hover:bg-red-950 shadow-md"
                >
                    View Detailed Assessment Results
                </button>
            </div>
        </div>
    </div>
);
                                                                    }
    

    
































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function AssessmentResultsPage() {
//     const navigate = useNavigate();

//     const [students, setStudents] = useState([]);
//     const [evaluations, setEvaluations] = useState([]);
//     const [groups, setGroups] = useState([]);
//     const [studentData, setStudentData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/userRegApi/get_students/');
//             const studentsData = response.data;
//             console.log("Fetched students:", studentsData);
//             setStudents(studentsData);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//             setError('Failed to load student data');
//         }
//     };

//     const fetchEvaluationsForStudents = async () => {
//         try {
//             const evaluationData = [];
//             for (const student of students) {
//                 if (student.user_id) {
//                     const response = await axios.get(`http://localhost:8000/userRegApi/get-evaluations/${student.user_id}/1/`, {
//                         withCredentials: true
//                     });
//                     console.log(`Evaluations for student ${student.user_id}:`, response.data);
//                     evaluationData.push({ studentId: student.user_id, evaluations: response.data });
//                 }
//             }
//             console.log("All evaluations data:", evaluationData);
//             setEvaluations(evaluationData);
//         } catch (error) {
//             console.error('Error fetching evaluations:', error.response || error.message || error);
//             setError('Failed to load evaluations data');
//         }
//     };

//     const fetchGroupsForStudents = async () => {
//         try {
//             const groupData = [];
//             for (const student of students) {
//                 if (student.user_id) {
//                     const response = await axios.get(`http://localhost:8000/userRegApi/get-groupMembers/${student.user_id}/`, {
//                         withCredentials: true
//                     });
//                     console.log(`Groups for student ${student.user_id}:`, response.data);
//                     groupData.push({ studentId: student.user_id, groups: response.data });
//                 }
//             }
//             console.log("All groups data:", groupData);
//             setGroups(groupData);
//         } catch (error) {
//             console.error('Error fetching groups:', error.response || error.message || error);
//             setError('Failed to load group data');
//         }
//     };

//     const calculateAverage = (ratings) => {
//         const validRatings = ratings.filter(rating => rating != null);
//         if (validRatings.length === 0) return 0;
//         const sum = validRatings.reduce((total, rating) => total + rating, 0);
//         return (sum / validRatings.length).toFixed(2);
//     };

//     useEffect(() => {
//         if (students.length > 0 && evaluations.length > 0 && groups.length > 0) {
//             const combinedData = students.map(student => {
//                 const studentEvaluations = evaluations.find(evaluation => evaluation.studentId === student.user_id);
//                 const studentGroups = groups.find(group => group.studentId === student.user_id);

//                 const cooperationRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.cooperation_rating) : [];
//                 const conceptualRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.conceptualContribution_rating) : [];
//                 const practicalRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.practicalContribution_rating) : [];
//                 const workEthicRatings = studentEvaluations ? studentEvaluations.evaluations.map(evaluation => evaluation.workEthic_rating) : [];

//                 const averageCooperation = calculateAverage(cooperationRatings);
//                 const averageConceptual = calculateAverage(conceptualRatings);
//                 const averagePractical = calculateAverage(practicalRatings);
//                 const averageWorkEthic = calculateAverage(workEthicRatings);

//                 return {
//                     studentId: student.user_id,
//                     firstName: student.first_name,
//                     lastName: student.last_name,
//                     groups: studentGroups ? studentGroups.groups : [],
//                     evaluations: studentEvaluations ? studentEvaluations.evaluations : [],
//                     averageCooperation,
//                     averageConceptual,
//                     averagePractical,
//                     averageWorkEthic
//                 };
//             });
//             setStudentData(combinedData);
//             setLoading(false);
//         }
//     }, [students, evaluations, groups]);

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     useEffect(() => {
//         if (students.length > 0) {
//             fetchEvaluationsForStudents();
//             fetchGroupsForStudents();
//         }
//     }, [students]);

//     const handleLogout = (event) => {
//         event.preventDefault();
//         localStorage.removeItem("student_id");
//         navigate('/');
//     };

//     const [openTeam, setOpenTeam] = useState(null);

//     const toggleTeam = (teamName) => {
//         setOpenTeam(openTeam === teamName ? null : teamName);
//     };


//     // Navigate to detailed results page
//     const goToDetailedResults = () => {
//         navigate('/detailedResults');
//     };

//     return (
//         <div className="flex min-h-screen bg-slate-200">
//             <div className="w-64 bg-gray-200 text-black p-5 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900">
//                 <ul className="mt-20">
//                     <li className="mb-4"><a href="/profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Profile</a></li>
//                     <li className="mb-4"><a href="/teacher" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">My Dashboard</a></li>
//                     <li className="mb-4"><a href="/create-classes" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Create class</a></li>
//                     <li className="mb-4"><a href="/create-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Create Teams</a></li>
//                     <li className="mb-4"><a href="/current-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Current Teams</a></li>
//                     <li className="mb-4"><a href="/assessment-results" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Assessment Results</a></li>
//                 </ul>
//                 <ul className='p-3 mt-8'>
//                     <img src='/img/concordialogo.png' alt='concordia-logo' />
//                 </ul>
//             </div>

//             <div className="flex-grow ml-64 p-8 pt-20">
//                 <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
//                     <div className="text-white text-lg flex items-center">
//                         <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
//                     </div>
//                     <div className="flex items-center space-x-6">
//                         <span className="text-white hover:text-red-950 cursor-pointer py-2 px-4 text-sm font-medium bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
//                             Profile
//                         </span>
//                         <button 
//                             type='button' 
//                             onClick={handleLogout} 
//                             className="py-2 px-4 text-sm font-medium text-white bg-red-900 hover:bg-red-950 rounded-lg">
//                             Logout
//                         </button>
//                     </div>
//                 </nav>

//                 <h1>Assessment Results</h1>
//                 {loading && <p>Loading...</p>}
//                 {error && <p>{error}</p>}
//                 {!loading && !error && studentData.length === 0 && <p>No data found for students.</p>}

//                 {/* Display combined data in a tabular format */}
//                 {!loading && !error && studentData.length > 0 && (
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full table-auto">
//                             <thead className="bg-gray-300">
//                                 <tr>
//                                     <th className="px-4 py-2">Student Name</th>
//                                     <th className="px-4 py-2">Group</th>
//                                     <th className="px-4 py-2">Cooperation Rating</th>
//                                     <th className="px-4 py-2">Conceptual Rating</th>
//                                     <th className="px-4 py-2">Practical Rating</th>
//                                     <th className="px-4 py-2">Work Ethic Rating</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {studentData.map(({ studentId, firstName, lastName, groups, averageCooperation, averageConceptual, averagePractical, averageWorkEthic }) => (
//                                     <tr key={studentId} className="bg-white border-b">
//                                         <td className="px-4 py-2">{firstName} {lastName}</td>
//                                         <td className="px-4 py-2">{groups.join(', ')}</td>
//                                         <td className="px-4 py-2">{averageCooperation}</td>
//                                         <td className="px-4 py-2">{averageConceptual}</td>
//                                         <td className="px-4 py-2">{averagePractical}</td>
//                                         <td className="px-4 py-2">{averageWorkEthic}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {/* Export button and View Detailed Results button */}
//                 <div className="flex justify-center mt-4 space-x-4">
//                     <button 
//                         onClick={goToDetailedResults} 
//                         className="mt-4 bg-red-900 text-white p-2 rounded-md hover:bg-red-950">
//                         View Detailed Results
//                     </button>
//                 </div>

//             </div>
            
//         </div>
//     );
// }
