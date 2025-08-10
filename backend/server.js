// server.js — fixed import for users.js
import express from 'express';
import usersRoutes from './routes/users.js';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

// Example root route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


