import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

// Function makes calls to API
export default function CreateAccount() {

    // Capture user input from form
    const [studentId, setStudentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');  //set default to student
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Data Validation
        if(!studentId || !firstName || !lastName || !email || !password) {
            alert('All fields are required');
            return;
        }
        try {
            let response;
            // Make a POST request to the registration API
            if(userType === 'student') {
                const userData = {
                    student_id: studentId,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                };

                response = await axios.post('http://localhost:8000/userRegApi/create-student/', userData);
            } else {
                const userData = {
                    instructor_id: studentId,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                };

                response = await axios.post('http://localhost:8000/userRegApi/create-instructor/', userData);

            }

            if(response.status === 200 || response.status === 201) {
                navigate('/student'); // Redirect to student/teacher to login page once their account is created
            } else {
                alert('Registration failed: ' + response.data.detail);
            }
        } catch (error) {
            // Handle network errors or other
            console.error('An error occured: ', error);
            alert('There was an issue registering your accout');
        }   
    };

    return (
        <div className='bg-slate-200 flex min-h-screen flex-col justify-center px-6  lg:px-8'>
        <div className='text-center text-3xl font-bold text-gray-900 mb-5'>Gina Cody School Peer Assessment</div>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img className='mx-auto h-25 w-auto' src='/img/concordialogo.png' alt='Concordia-Logo'></img>
                <h2 className='mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900'>Create account</h2>
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
                        className='block w-full rounded-sm p-2 mb-2 border'/> 

                    <input value={firstName}
                    onChange={ev => setFirstName(ev.target.value)}
                    type='text' placeholder='first name' 
                    required
                    className='block w-full rounded-sm p-2 mb-2 border'/>

                    <input value={lastName}
                    onChange={ev => setLastName(ev.target.value)}
                    type='text' placeholder='last name' 
                    required
                    className='block w-full rounded-sm p-2 mb-2 border'/>

                    <input value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    type='email' placeholder='email' 
                    required
                    className='block w-full rounded-sm p-2 mb-2 border'/>   
   
                    <input value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                        type='password' placeholder='password'
                        required 
                        className='block w-full rounded-sm p-2 mb-2 border'/>

                    <button className='bg-red-900 text-white block w-full rounded-sm p-2 hover:bg-red-950'>Register</button>
                    
                </form>
            </div>
        </div>
    );
}
