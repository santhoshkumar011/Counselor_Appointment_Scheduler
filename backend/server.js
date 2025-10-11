// server.js
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000; // Use 3000 to match Docker/K8s
const SECRET_KEY = 'mysecretkey123';

app.use(cors());
app.use(bodyParser.json());

// Demo users
const users = [
  { email: 'student@demo.edu', password: 'password123', role: 'student', name: 'Demo Student' },
  { email: 'counselor@demo.edu', password: 'password123', role: 'counselor', name: 'Demo Counselor' }
];

// Login route
app.post('/api/auth/login', (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password;
  const role = req.body.role.toLowerCase().trim();

  const user = users.find(u =>
    u.email.toLowerCase() === email &&
    u.password === password &&
    u.role === role
  );

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { email: user.email, role: user.role, name: user.name },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token, role: user.role, name: user.name });
});

// Verify JWT middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// Protected route
app.get('/api/appointments', verifyToken, (req, res) => {
  const appointments = [
    { id: 1, title: 'Counseling Session', date: '2025-10-12', time: '10:00 AM' },
    { id: 2, title: 'Career Guidance', date: '2025-10-15', time: '02:00 PM' }
  ];
  res.json({ user: req.user, appointments });
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
