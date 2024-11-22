import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationPage() {
    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("student_id");
        navigate('/');
    }

    function checkoutProfile(event) {
        event.preventDefault();
        navigate('/profile');
    }

    return (
        <div className="bg-slate-200 min-h-screen flex flex-col">
            {/* Header */}
            <nav className="bg-red-900 p-4 flex justify-between items-center">
                <div className="text-white text-lg flex items-center">
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

            {/* Main content */}
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-red-900 mb-6">Assessment Submitted Successfully!</h1>
                <p className="text-lg text-gray-700 mb-6">Thank you for your submission. Your assessment has been recorded successfully.</p>
                <button
                    onClick={() => navigate('/mainStudentPage')}
                    className="mt-8 bg-red-900 text-white py-2 px-6 rounded-lg hover:bg-red-950 transition duration-200"
                >
                    Return to Dashboard
                </button>
            </div>

            {/* Footer */}
            <footer className="bg-red-900 text-white text-right py-4 px-4 mt-10">
                <p>© 2024 GCS Peer Assessment Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}
