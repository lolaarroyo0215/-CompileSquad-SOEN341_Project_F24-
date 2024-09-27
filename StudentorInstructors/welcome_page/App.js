import React, { useState } from 'react';

const WelcomePage = () => {
  const handleRoleSelection = (role) => {
    // Logique de sélection de rôle ici
    console.log(`Vous avez sélectionné : ${role}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Welcome to GCS Peer Assessment</h1>
        <p style={styles.subtitle}>Please select your role:</p>
        <div style={styles.buttonContainer}>
          <ButtonWithHover onClick={() => handleRoleSelection('Student')}>I am a Student</ButtonWithHover>
          <ButtonWithHover onClick={() => handleRoleSelection('Teacher')}>I am a Teacher</ButtonWithHover>
        </div>
      </div>
    </div>
  );
};

const ButtonWithHover = ({ onClick, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={styles.buttonWrapper}>
      <button
        style={styles.button}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </button>
      {hovered && <div style={styles.underline}></div>} {/* Ligne sous le bouton */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5dc', // Fond beige
    textAlign: 'center',
  },
  box: {
    backgroundColor: 'white', // Boîte blanche pour le titre et les boutons
    padding: '30px', // Augmentation du rembourrage pour plus d'espace
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Ombre pour la boîte
    marginBottom: '30px',
  },
  title: {
    color: '#000', // Bourgogne foncé
    fontSize: '2.5em',
    margin: '0',
  },
  subtitle: {
    color: '#333',
    fontSize: '1.2em',
    margin: '10px 0 0 0',
  },
  buttonContainer: {
    display: 'flex', // Utilise flexbox pour centrer les boutons
    flexDirection: 'column', // Colonne pour empiler les boutons
    alignItems: 'center', // Centre les boutons
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
    backgroundColor: '#A52A2A', // Bourgogne
    color: 'white',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Ombre améliorée
    display: 'block',
    width: '220px',
  },
  underline: {
    position: 'absolute',
    bottom: '-8px', // Position sous le bouton
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%', // Prend toute la largeur du bouton
    height: '4px',
    backgroundColor: 'black', // Couleur de la ligne noire
    transition: 'opacity 0.2s ease-in-out', // Animation d'opacité
  },
};

export default WelcomePage;
