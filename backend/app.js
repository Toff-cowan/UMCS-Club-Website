const express = require('express');
const cors = require('cors');

const app = express();

 
app.use(cors());
app.use(express.json());

// Routes
const sigsRoutes = require('./routes/sigs');
app.use('/api/sigs', sigsRoutes);

const executiveRoutes = require('./routes/executive'); 
app.use('/api/executives', executiveRoutes);

// Example route
app.get('/api/data', async (req, res) => {
  // Your database query here
  res.json({ message: 'Hello from backend!' });
});

module.exports = app;
