import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Example root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Import routes
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
