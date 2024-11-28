import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function NewAssessmentPage() {
    const navigate = useNavigate();
    const [cooperationRating, setCooperationRating] = useState(0); // Cooperation rating
    const [conceptualRating, setConceptualRating] = useState(0); // Conceptual Contribution rating
    const [practicalRating, setPracticalRating] = useState(0); // Practical Contribution rating
    const [workEthicRating, setWorkEthicRating] = useState(0); // Work Ethic rating
    const [generalComments, setGeneralComments] = useState('');  // Comments
    const evaluatee = localStorage.getItem("evaluatee");
    const evaluator = localStorage.getItem("student_id");
    const group = localStorage.getItem("group");

    // Function to handle star click
    const handleStarClick = (setRating) => (rating) => {
        setRating(rating);
    };

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("student_id");
        localStorage.removeItem("evaluatee");
        navigate('/');
    }

    function handleSubmit() {
        const evaluation = {
            evaluator: evaluator,
            evaluatee: evaluatee, 
            cooperation_rating: cooperationRating,
            conceptualContribution_rating: conceptualRating,
            practicalContribution_rating: practicalRating,
            workEthic_rating: workEthicRating,
            feedback: generalComments,
            group: group
        };

        axios.post('http://localhost:8000/userRegApi/create-evaluation/', evaluation)
            .then((response) => {
                console.log("Assessment submitted successfully:", response.data);
                navigate('/confirmation');
                localStorage.removeItem("evaluatee");
            })
            .catch((error) => {
                console.error("Error submitting assessment:", error);
            
            });
            
    }


    return (
        <div className="flex min-h-screen bg-slate-200">
            {/* Sidebar */}
            <div className="w-64 bg-gray-200 text-black p-6 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900 z-10">
                <ul className="mt-28">
                    <li className="mb-4">
                        <a href="/student-profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Profile</a>
                    </li>
                    <li className="mb-4">
                        <a href="/student" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">My Dashboard</a>
                    </li>
                    <li className="mb-4">
                        <a href="/new-assessment" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">New Assessment</a>
                    </li>
                    <li className="mb-4">
                        <a href="/view-my-grades" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">View My Grades</a>
                    </li>
                    <li className="mb-4">
                        <a href="/view-my-teams" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">View My Teams</a>
                    </li>
                </ul>
                <ul className='p-3 mt-8'>
                    <img src='/img/concordialogo.png' alt='concordia-logo' />
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-grow ml-64 p-8 pt-20 pb-32"> 
                
                <nav className="bg-red-900 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-40">
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
                            type='button'
                            onClick={handleLogout}
                            className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none"
                        >
                            Log Out
                        </button>
                    </div>
                </nav>

                <h1 className="text-3xl font-bold text-black mt-12 mb-20 text-center">Peer Assessment</h1>

                {/* Cooperation Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Cooperation</h2>
                    <p className="mb-2">Actively participating in meetings, Communicating within the group, Assisting teammates when needed, Volunteering for tasks.</p>
                    <StarRating rating={cooperationRating} setRating={setCooperationRating} />
                </div>

                {/* Conceptual Contribution Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Conceptual Contribution</h2>
                    <p className="mb-2">Researching and gathering information, Quality of individual contribution, Suggesting ideas, Tying ideas together, Identifying difficulties, Identifying effective approaches.</p>
                    <StarRating rating={conceptualRating} setRating={setConceptualRating} />
                </div>

                {/* Practical Contribution Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Practical Contribution</h2>
                    <p className="mb-2">Writing of the report(s), Reviewing others’ report(s) or section(s), Providing constructive feedback on the report(s) or the presentation, Contributing to the organization of the work, Contributing to the preparation of presentation(s) (if appropriate).</p>
                    <StarRating rating={practicalRating} setRating={setPracticalRating} />
                </div>

                {/* Work Ethic Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Work Ethic</h2>
                    <p className="mb-2">Displaying a positive attitude, Respecting team-mates and their ideas, Respecting commitments, Respecting deadlines, Respecting team-mates’ ideas.</p>
                    <StarRating rating={workEthicRating} setRating={setWorkEthicRating} />
                </div>

                {/* General Comments Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Comments</h2>
                    <textarea
                        value={generalComments}
                        onChange={(e) => setGeneralComments(e.target.value)}
                        placeholder="Add your general comments here..."
                        className="mt-2 w-full p-2 border rounded-lg"
                    ></textarea>
                </div>

                <div className="flex justify-center mt-5">
                    <button
                        className="bg-red-900 text-white py-4 px-8 rounded hover:bg-red-950 transition duration-200 text-xl"
                        onClick={() => {
                            handleSubmit();
                            navigate('/confirmation');
                        }}
                    >
                        Submit Assessment
                    </button>
                </div>
            </div>

            {/* Footer*/}
            <footer className="bg-red-900 text-white text-center py-4 fixed bottom-0 left-0 w-full z-30">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}

// Star Rating
function StarRating({ rating, setRating }) {
    return (
        <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    filled={star <= rating}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    );
}

// Star component
function Star({ filled, onClick }) {
    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 cursor-pointer transition duration-200 ease-in-out ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill={filled ? 'currentColor' : 'none'}
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
        </svg>
    );
}