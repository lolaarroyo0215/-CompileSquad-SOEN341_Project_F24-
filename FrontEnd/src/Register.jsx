import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

// Function makes calls to API for login
export default function Register() {

    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student'); // set default to student
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Data Validation
        if (!studentId || !password || !userType) {
            alert('All fields are required');
            return;
        }


        try {
            if (userType == 'student') {
                const userData = {
                    user_id: studentId,
                    password: password
                };
                const response = await axios.post('http://localhost:8000/userRegApi/student-login/', userData);
                console.log(response);
                if (response.data) {
                    const { access, refresh } = response.data;

                    // Save tokens to local storage
                    localStorage.setItem("access_token", access);
                    localStorage.setItem("refresh_token", refresh);
                    localStorage.setItem("user_role", userType);

                    console.log("Login successful");
                    navigate('/student');

                }
                else {
                    const errorData = response.data;
                    alert('Login failed: ' + errorData.detail);
                }
            }
            else {
                const userData = {
                    user_id: studentId,
                    password: password
                };
                const response = await axios.post('http://localhost:8000/userRegApi/instructor-login/', userData);
                if (response.data) {
                    const { access, refresh } = response.data;

                    // Save tokens to local storage
                    localStorage.setItem("access_token", access);
                    localStorage.setItem("refresh_token", refresh);
                    localStorage.setItem("user_role", userType);
                    localStorage.setItem("instructor_id", studentId);


                    console.log("Login successful");
                    navigate('/teacher');
                }
                else {
                    const errorData = response.data;
                    alert('Login failed: ' + errorData.detail);
                }
            }
        }
        catch (error) {
            // Handle network errors
            console.error('An error occurred: ', error);
            alert('Issue logging in');
        }

    };

    return (
        <div className='bg-slate-200 flex min-h-screen flex-col justify-center px-6  lg:px-8'>
            <div className='text-center text-3xl font-bold text-gray-900 mb-5'>Gina Cody School Peer Assessment</div>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img className='mx-auto h-25 w-auto' src='/img/concordialogo.png' alt='Concordia-Logo'></img>
                <h2 className='mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900'>Sign in to your account</h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6' onSubmit={handleSubmit}>

                    <select
                        value={userType}
                        onChange={ev => setUserType(ev.target.value)}
                        className='block w-full'>

                        <option value='student'>Student</option>
                        <option value='teacher'>Teacher</option>

                    </select>

                    <input value={studentId}
                        onChange={ev => setStudentId(ev.target.value)}
                        type='number' placeholder='userId'
                        required
                        className='block w-full rounded-sm p-2 mb-2 border' />

                    <input value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        type='password' placeholder='password'
                        required
                        className='block w-full rounded-sm p-2 mb-2 border' />

                    <button className='bg-red-900 text-white block w-full rounded-sm p-2 hover:bg-red-950'>Register</button>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Not a member yet?
                        <a href='/create-account' className='font-semibold leading-6 text-sky-800 hover:text-sky-950'> Create an account here</a>
                    </p>


                </form>
            </div>
        </div>
    );
}
