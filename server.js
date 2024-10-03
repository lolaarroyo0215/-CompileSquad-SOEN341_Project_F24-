const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // => for loading variable from env file

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register Route (User Creation)
app.post('/api/register', async (req, res) => {
    const { studentId, firstName, lastName, email, password, userType } = req.body;

    // Check if user already exists
    const exisitingUser = await U
    
})