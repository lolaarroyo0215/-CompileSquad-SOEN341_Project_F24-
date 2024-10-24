import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewAssessmentPage() {

    const navigate = useNavigate();

    const [cooperationRating, setCooperationRating] = useState(0); // Cooperation rating
    const [conceptualRating, setConceptualRating] = useState(0); // Conceptual Contribution rating
    const [practicalRating, setPracticalRating] = useState(0); // Practical Contribution rating
    const [workEthicRating, setWorkEthicRating] = useState(0); // Work Ethic rating

    // Function to handle star click
    const handleStarClick = (setRating) => (rating) => {
        setRating(rating); // Set the clicked star as the rating
    };

    function handleLogout(event) {
        event.preventDefault();
        navigate('/');
      }

    return (
        <div className="bg-slate-200 min-h-screen flex flex-col">
            {/* Header */}
            <nav className="bg-red-900 p-4 flex justify-between items-center">
                <div className="text-white text-lg">
                    <img src="/img/concordialogo.png" alt="Logo" className="h-8" />
                </div>
                <div className="flex space-x-10">
                    <span className="text-white hover:text-red-950 cursor-pointer">Profile</span>
                    <span className="text-white hover:text-red-950 cursor-pointer"></span>
                    <button type='button' onClick={handleLogout} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Log Out</button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Peer Assessment</h1>

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
            </main>

            <div className="flex justify-center mt-5">
                <button
                    className="bg-red-900 text-white py-4 px-8 rounded hover:bg-red-950 transition duration-200 text-xl"
                    onClick={() => {
                        // Handle form submission logic here
                        alert('Assessment submitted!');
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
                    filled={star <= rating} // Determine if the star should be filled
                    onClick={() => setRating(star)} // Set the clicked star as the rating
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