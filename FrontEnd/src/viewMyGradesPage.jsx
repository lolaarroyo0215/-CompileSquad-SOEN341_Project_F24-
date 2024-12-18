import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

export default function ViewMyGrades() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("student_id");
  const [classesData, setClassesData] = useState([]);
  const [openClass, setOpenClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the mapping between internal category names and display names
  const categoryDisplayNames = {
    cooperation_rating: "Cooperation",
    conceptualContribution_rating: "Conceptual Contribution",
    workEthic_rating: "Work Ethic",
    practicalContribution_rating: "Practical Contribution",
  };

  useEffect(() => {
    if (!studentId) {
      setError("Student ID is not available.");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8000/userRegApi/get-studentsGroups/${studentId}/`, { withCredentials: true })
      .then(response => {
        const groups = response.data.map(item => item.group);

        const groupRequests = groups.map(group =>
          axios.get(`http://localhost:8000/userRegApi/get-evaluations/${studentId}/${group}/`, { withCredentials: true })
            .then(evaluationsResponse => {
              const evaluations = evaluationsResponse.data;
              const ratingCategories = Object.keys(categoryDisplayNames);  // Use the internal keys
              const ratingAverages = ratingCategories.reduce((acc, category) => ({ ...acc, [category]: 0 }), {});
              const feedback = [];

              let evaluationCount = 0;

              evaluations.forEach(evaluation => {
                console.log("Evaluation:", evaluation);

                // Ensure each category has a valid numeric value
                ratingCategories.forEach(category => {
                  const rating = evaluation[category];
                  console.log(`Rating for ${category}:`, rating);
                  if (typeof rating === 'number' && !isNaN(rating)) {
                    ratingAverages[category] += rating;
                  }
                });

                feedback.push(evaluation.feedback);
                evaluationCount++;
              });

              console.log("Rating Averages:", ratingAverages);

              // Calculate averages if there are evaluations
              if (evaluationCount > 0) {
                ratingCategories.forEach(category => {
                  ratingAverages[category] = (ratingAverages[category] / evaluationCount).toFixed(2);
                });
              } else {
                // If no evaluations, set averages to 'N/A'
                ratingCategories.forEach(category => {
                  ratingAverages[category] = 'N/A';
                });
              }

              return { group, averages: ratingAverages, feedback };
            })
        );

        Promise.all(groupRequests)
          .then(updatedClasses => {
            setClassesData(updatedClasses);
            setLoading(false);
          })
          .catch(err => {
            setError("Error fetching evaluations.");
            console.error("Error fetching evaluations:", err);
            setLoading(false);
          });
      })
      .catch(err => {
        setError("Error fetching groups.");
        console.error("Error fetching groups:", err);
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

  const toggleClass = (className) => {
    setOpenClass(openClass === className ? null : className);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                </div>
                <div className="flex items-center space-x-6">
                  <button 
                      type='button' 
                      onClick={() => navigate("/student-profile")} 
                      className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
                      Profile
                  </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="py-2 px-4 text-sm font-medium text-white bg-red-900 hover:bg-red-950 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <h1 className="text-3xl font-bold text-black mt-20 mb-20 text-center">Your Grades by Class</h1>

            {classesData.map((classItem, index) => (
                <div key={index} className="mb-6">
                    <button
                        onClick={() => toggleClass(classItem.group)}
                        className="w-full bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none text-left"
                    >
                        {classItem.group}
                    </button>

                    {openClass === classItem.group && (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                            <table className="table-auto w-full text-left mb-4">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2">Category</th>
                                        <th className="px-4 py-2 text-center">Average Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(classItem.averages).map(([category, average], idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="px-4 py-2">{categoryDisplayNames[category] || category}</td> {/* Display the user-friendly name */}
                                            <td className="px-4 py-2 text-center">{average}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h3 className="text-lg font-bold mb-2">Feedback</h3>
                            {classItem.feedback.map((fb, fbIdx) => (
                                <p key={fbIdx} className="mb-2 border-b border-gray-300 pb-2">{fb}</p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);
                            }