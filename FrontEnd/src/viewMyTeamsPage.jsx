import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

export default function MainTeammatesPage() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("student_id");
  const [classesData, setClassesData] = useState([]);
  const [openClass, setOpenClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) {
      setError("Student ID is not available.");
      setLoading(false);
      return;
    }
    axios.get(`http://localhost:8000/userRegApi/get-studentsGroups/${studentId}/`, {
      withCredentials: true
    })
    .then(response => {
      const groups = response.data.map(item => item.group); 
      console.log(groups);  
      
      // Step 2: Fetch teammates for each group
      const groupRequests = groups.map(group => 
        axios.get(`http://localhost:8000/userRegApi/get-groupMembers/${group}/`, {
          withCredentials: true
        }).then(teammatesResponse => {
          // Extract only the student_id values from each element
          const studentIds = teammatesResponse.data.map(item => item.student);
          console.log(studentIds); 

          const studentNameRequests = studentIds.map(studentId =>
            axios.get(`http://localhost:8000/userRegApi/get-studentData/${studentId}/`, {
              withCredentials: true
            }).then(studentResponse => {
              console.log(studentResponse.data);
              const first_name = studentResponse.data.first_name;
              const last_name = studentResponse.data.last_name;
              console.log(first_name);
              console.log(last_name);
              return {
                studentId,
                studentName: `${first_name} ${last_name}`
              };
            })
          );


          // Add the group and student_ids data to the response
          return Promise.all(studentNameRequests).then(teammateNames => {
            return {
              group,  
              teammates: teammateNames
            };
          });
        })
      );
      
      // Wait for all teammate data to be fetched
      Promise.all(groupRequests)
        .then(updatedClasses => {
          setClassesData(updatedClasses);
          setLoading(false);
        })
        .catch(err => {
          setError("Error fetching teammates.");
          console.error("Error fetching teammates:", err);
          setLoading(false);
        });
    })
    .catch(err => {
      setError("Error fetching classes.");
      console.error("Error fetching classes:", err);
      setLoading(false);
    });
  }, [studentId]);

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("instructor_id");
    navigate('/');
  }

  function checkoutProfile(event) {
    event.preventDefault();
    navigate('/student-profile');
  }

  // Function to toggle a class's dropdown
  const toggleClass = (className) => {
    // Use className to open and close specific classes
    setOpenClass(openClass === className ? null : className);
  };

  const handleEvaluate = (studentId) => {
    localStorage.setItem("evaluatee", studentId);
    localStorage.setItem("group", openClass);
    console.log("This hsould be a student ID: ", studentId);
    console.log(openClass);
    navigate(`/new-assessment`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-200">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 text-black p-5 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900">
            <ul className="mt-20">
                <li className="mb-4">
                    <a href="/student-profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        Profile
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/student" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        My Dashboard
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/view-my-grades" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        View My Grades
                    </a>
                </li>
                <li className="mb-4">
                    <a href="/view-my-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">
                        View My Teams
                    </a>
                </li>
            </ul>
            <ul className="p-3 mt-8">
                <img src="/img/concordialogo.png" alt="concordia-logo" />
            </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow ml-64 p-8 pt-20 pb-32">
            {/* Header */}
            <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
                <div className="text-white text-lg flex items-center">
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8 mr-4" />
                    <span>Peer Assessment Tool</span>
                </div>
                <div className="flex items-center space-x-10">
                    <button
                        type="button"
                        onClick={checkoutProfile}
                        className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
                    >
                        Profile
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
                    >
                        Log Out
                    </button>
                </div>
            </nav>

            {/* Page Title */}
            <h1 className="text-3xl font-bold text-black mt-20 mb-20 text-center">
                Your Teammates by Class
            </h1>

            {/* Main Content Area */}
            <div className="flex-grow p-8">
                {classesData.length > 0 ? (
                    classesData.map((classItem, index) => (
                        <div key={index} className="mb-6">
                            <button
                                onClick={() => toggleClass(classItem.group)} // Toggle based on group
                                className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
                            >
                                {classItem.group} {/* Display group name */}
                            </button>

                            {openClass === classItem.group && (
                                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                                    <table className="table-auto w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th colSpan="2" className="px-4 py-2">Teammate ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classItem.teammates.map((teammate, idx) => (
                                                <tr key={idx} className="border-b">
                                                    <td className="px-4 py-2">{teammate.studentName}</td> {/* Display student_id */}
                                                    <td className="px-4 py-2 flex justify-end">
                                                        <button
                                                            onClick={() => handleEvaluate(teammate.studentId)}
                                                            className="bg-red-900 text-white py-1 px-3 rounded hover:bg-gray-500"
                                                        >
                                                            Evaluate
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No groups found.</p>
                )}
            </div>
        </div>
    </div>
);
                }