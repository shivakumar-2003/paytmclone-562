const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this to handle cross-origin requests (for frontend to backend communication)

const app = express();

// Middleware to parse JSON data from requests
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for frontend interaction

// MongoDB Connection (replace with your MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/digital_wallet'; // Local connection
// or, for MongoDB Atlas
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/digital_wallet';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection failed', err));

// Import the User Transaction model
const UserTransaction = require('./models/userTransaction');

// API endpoint for recording transaction details
app.post('/transaction', async (req, res) => {
  try {
    const { userId, transactionAmount, transactionType, timestamp } = req.body;

    // Basic validation of inputs
    if (!userId || !transactionAmount || !transactionType || !timestamp) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new transaction record
    const newTransaction = new UserTransaction({
      userId,
      transactionAmount,
      transactionType,
      timestamp
    });

    // Save the transaction to MongoDB
    await newTransaction.save();

    // Send success response
    res.status(200).json({
      message: 'Transaction recorded successfully',
      transaction: newTransaction
    });

  } catch (error) {
    console.error('Error in transaction recording:', error);
    res.status(500).json({ error: 'Failed to record transaction' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});