import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';


export default function Profile(){

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //fetch student data from the API
        const studentId = localStorage.getItem("student_id");
        const instructorId = localStorage.getItem("instructor_id");

        if(studentId) {
            setUserType('student');
            fetchUserData(studentId, 'student');
        } else if(instructorId) {
            setUserType('instructor');
            fetchUserData(instructorId, 'instructor');
        } else {
            setError('No user id found');
            setLoading(false);
        }
    }, []);

    function fetchUserData(id, type) {
        axios.get(`http://localhost:8000/get-${type}Data/${id}/`, {withCredentials: true})
        .then(response => {
            setUser(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError(`Error fetching ${type} data`);
            setLoading(false);
        });
    }     
    
    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("student_id");
        navigate('/');
    }
       
    if(loading) return <div>Loading...</div> 
    if(error) return <div>{error}</div>

    return (
        
    <div className="bg-red-900 min-h-screen flex items-center">

    {/* Sidebar (Nav Bar) */}
     <div className="w-64 bg-gray-200 text-black p-6 fixed top-0 left-0 h-full md:block hidden">
        <h2 className="bg-gray-300 text-2xl font-bold mb-3 p-5">
            {userType === 'student' ? 'Student' : 'Instructor'} Dashboard
        </h2>
        <ul>
          <li className="mb-4 hover:bg-gray-700 rounded-lg">
            <a href="/profile" className="block p-2">Profile</a>
          </li>
          <li className="mb-4 hover:bg-gray-700 rounded-lg">
            <a href={`/${userType}`} className="block p-2">My Dashboard</a>
          </li>

          {userType === 'student' ? (
            <>
                <li className="mb-4 hover:bg-gray-700 rounded-lg">
                    <a href="/view-my-teams" className="block p-2">View My Teams</a>
                </li>
                <li className="mb-4 hover:bg-gray-700 rounded-lg">
                    <a href="/new-assessment" className="block p-2">New Assessment</a>
                </li>
                <li className="mb-4 hover:bg-gray-700 rounded-lg">
                    <a href="/view-my-grades" className="block p-2">View My Grades</a>
                </li>
            </>
            ) : (
                <li className="mb-4 hover:bg-gray-700 rounded-lg">
                    <a href="/get-courses/<int:teacher_id>" className="block p-2">View My Classes</a>
                </li>
            )}
         
        </ul>
        <ul className='p-3'> 
        <img src='\public\img\concordialogo.png' alt='concordia-logo'></img>
        </ul>
      </div>


    {/* Main Content */}
        <div className="max-w-lg mx-auto p-8 bg-gray-200 shadow-xl rounded-lg mt-10">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
                <p className="text-gray-500">
                    {userType === 'student' ? `Student Number: ${user.studentId}` : `Instructor ID: ${user.instructorId}`}
                </p>
            </div>

            {{/* Classes Content */}}
            <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-700">Classes</h2>
                {user.classes.map((course, index) => (
                    <div key={index} className="mt-4 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                        <div className="mt-2 space-y-2">
                            {course.groups.map((group, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between bg-white p-3 rounded shadow-sm"
                                >
                                    <p className="text-gray-700 font-medium">Group: {group.groupName }</p>
                                    {userType === 'student' && (
                                         <p className="text-gray-500 p-3"> Peer Rating: {group.peerRating}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );

}