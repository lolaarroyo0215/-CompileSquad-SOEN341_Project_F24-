import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function NewAssessmentPage() {

    const navigate = useNavigate();

    const location = useLocation();
    const studentId = location.state?.studentId;
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

    function checkoutProfile(event){
        event.preventDefault();
        navigate('/profile');
    }

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
        <div className="bg-slate-200 min-h-screen flex flex-col">
    {/* Sidebar */}
    <div className="w-64 bg-gray-200 text-black p-6 fixed top-0 left-0 h-full hidden md:block border-r-4 border-red-900 z-10">
        <ul className="mt-28">
            <li className="mb-4">
                <a href="/profile" className="block p-2 text-lg font-bold hover:text-red-950 hover:underline">Profile</a>
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
    <nav className="bg-red-900 p-4 flex justify-between items-center">
        <div className="text-white text-lg flex items-center">
            {/* Logo image */}
            <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center space-x-6">
            <button 
                type='button' 
                onClick={checkoutProfile} 
                className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
                Profile
            </button>
            <button 
                type='button' 
                onClick={handleLogout} 
                className="py-2 px-4 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-950 focus:outline-none">
                Log Out
            </button>
        </div>
    </nav>

    {/* Main Content */}
    <main className="flex-grow p-6 ml-64"> {/* Add left margin to push content away from the sidebar */}
        <h1 className="text-2xl font-bold mb-4">Peer Assessment</h1>
        <h3 className='text-xl font-semibold'>Evaluating Student ID: {studentId}</h3>

        {/* Cooperation Section */}
        <div className="mb-6">
            <h2 className="text-xl font-semibold">Cooperation</h2>
            <p className="mb-2">Actively participating in meetings, Communicating within the group, Assisting teammates when needed, Volunteering for tasks.</p>
            <StarRating rating={cooperationRating} setRating={setCooperationRating} />
            <textarea
                value={cooperationComment}
                onChange={(e) => setCooperationComment(e.target.value)}
                placeholder="Add your comments on cooperation..."
                className="mt-2 w-11/12 p-2 border rounded-lg"
            ></textarea>
        </div>

        {/* Conceptual Contribution Section */}
        <div className="mb-6">
            <h2 className="text-xl font-semibold">Conceptual Contribution</h2>
            <p className="mb-2">Researching and gathering information, Quality of individual contribution, Suggesting ideas, Tying ideas together, Identifying difficulties, Identifying effective approaches.</p>
            <StarRating rating={conceptualRating} setRating={setConceptualRating} />
            <textarea
                value={conceptualComment}
                onChange={(e) => setConceptualComment(e.target.value)}
                placeholder="Add your comments on conceptual contribution..."
                className="mt-2 w-11/12 p-2 border rounded-lg"
            ></textarea>
        </div>

        {/* Practical Contribution Section */}
        <div className="mb-6">
            <h2 className="text-xl font-semibold">Practical Contribution</h2>
            <p className="mb-2">Writing of the report(s), Reviewing others’ report(s) or section(s), Providing constructive feedback on the report(s) or the presentation, Contributing to the organization of the work, Contributing to the preparation of presentation(s) (if appropriate).</p>
            <StarRating rating={practicalRating} setRating={setPracticalRating} />
            <textarea
                value={practicalComment}
                onChange={(e) => setPracticalComment(e.target.value)}
                placeholder="Add your comments on practical contribution..."
                className="mt-2 w-11/12 p-2 border rounded-lg"
            ></textarea>
        </div>

        {/* Work Ethic Section */}
        <div className="mb-6">
            <h2 className="text-xl font-semibold">Work Ethic</h2>
            <p className="mb-2">Displaying a positive attitude, Respecting team-mates and their ideas, Respecting commitments, Respecting deadlines, Respecting team-mates’ ideas.</p>
            <StarRating rating={workEthicRating} setRating={setWorkEthicRating} />
            <textarea
                value={workEthicComment}
                onChange={(e) => setWorkEthicComment(e.target.value)}
                placeholder="Add your comments on work ethic..."
                className="mt-2 w-11/12 p-2 border rounded-lg"
            ></textarea>
        </div>
    </main>

    <div className="flex justify-center mt-5">
        <button
            className="bg-red-900 text-white py-4 px-8 rounded hover:bg-red-950 transition duration-200 text-xl"
            onClick={() => {
                // Navigate to the confirmation page instead of showing an alert
                navigate('/confirmation');
            }}
        >
            Submit Assessment
        </button>
    </div>

    {/* Footer */}
    <footer className="bg-red-900 text-white text-right py-4 px-4 mt-10">
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