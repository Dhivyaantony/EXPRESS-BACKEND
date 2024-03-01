const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Middleware to parse JSON in request bodies
app.use(express.static('public'));
app.use(express.static(__dirname));

// In-memory storage for sign-up data
const users = [];

// Sign-up endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Validate if username is unique
  const userExists = users.some(user => user.username === username);

  if (userExists) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Store user information
  users.push({ username, password });
  res.status(200).json({ message: 'Sign-up successful' });
});

// Sign-in endpoint
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists and password is correct
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Sign-in successful' });
});

// Route for the root path
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
