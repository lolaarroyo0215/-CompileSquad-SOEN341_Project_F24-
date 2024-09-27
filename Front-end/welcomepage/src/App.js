import React, { useState } from 'react'; // Import React and useState for managing state
import logo from './logo.svg'; // Import logo image
import './App.css'; // Import CSS styles

// Define the WelcomePage component
const WelcomePage = () => {
  // Function to handle the role selection (Student or Teacher)
  const handleRoleSelection = (role) => {
    console.log(`You have selected: ${role}`); // Output selected role to the console
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Welcome to GCS Peer Assessment</h1> {/* Page title */}
        <p style={styles.subtitle}>Please select your role:</p> {/* Instruction for the user */}
        <div style={styles.buttonContainer}>
          {/* Button for selecting Student role */}
          <ButtonWithHover onClick={() => handleRoleSelection('Student')}>
            I am a Student
          </ButtonWithHover>
          {/* Button for selecting Teacher role */}
          <ButtonWithHover onClick={() => handleRoleSelection('Teacher')}>
            I am a Teacher
          </ButtonWithHover>
        </div>
      </div>
    </div>
  );
};

// Define the ButtonWithHover component, with hover effect
const ButtonWithHover = ({ onClick, children }) => {
  const [hovered, setHovered] = useState(false); // State to track if the button is hovered

  return (
    <div style={styles.buttonWrapper}>
      <button
        style={styles.button}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)} // Set hover state to true on mouse enter
        onMouseLeave={() => setHovered(false)} // Set hover state to false on mouse leave
      >
        {children}
      </button>
      {/* Underline appears when hovered */}
      {hovered && <div style={styles.underline}></div>}
    </div>
  );
};

// Define the styles for the WelcomePage components
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5dc', // Light beige background
    textAlign: 'center',
  },
  box: {
    backgroundColor: 'white', // White box for the title and buttons
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Shadow effect for the box
    marginBottom: '30px',
  },
  title: {
    color: '#000',
    fontSize: '2.5em',
    margin: '0',
  },
  subtitle: {
    color: '#333',
    fontSize: '1.2em',
    margin: '10px 0 0 0',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  buttonWrapper: {
    position: 'relative',
    margin: '10px auto',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#A52A2A', // Burgundy button color
    color: 'white',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Enhanced button shadow
    display: 'block',
    width: '220px',
  },
  underline: {
    position: 'absolute',
    bottom: '-8px', // Position the underline below the button
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%', // Full-width underline
    height: '4px',
    backgroundColor: 'black', // Black underline color
    transition: 'opacity 0.2s ease-in-out', // Opacity animation for the underline
  },
};

// App component that includes the WelcomePage
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> {/* React logo */}
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* WelcomePage component is rendered here */}
      <WelcomePage />
    </div>
  );
}

export default App; // Export the App component as default
