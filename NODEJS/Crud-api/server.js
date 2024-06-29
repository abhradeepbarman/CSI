const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/express-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB connected"))
.catch(() => console.log("DB error"))

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
