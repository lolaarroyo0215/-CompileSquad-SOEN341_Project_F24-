import Register from './Register';
import CreateAccount from './CreateAccount';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route  path='/' element={ <Register />} />
                <Route path='/create-account' element={ <CreateAccount /> } />
            </Routes>
        </Router>
    );
}

export default App;