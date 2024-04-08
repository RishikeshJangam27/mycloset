const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON and CORS
app.use(cors());
app.use(express.json());

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Hello from mycloset backend!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Listen on the configured port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
