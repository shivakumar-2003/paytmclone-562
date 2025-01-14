const mongoose = require('mongoose');

// Define the schema for user transactions
const userTransactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // ID of the user
  transactionAmount: { type: Number, required: true },  // Amount of the transaction
  transactionType: { type: String, enum: ['credit', 'debit'], required: true },  // Type: Credit or Debit
  timestamp: { type: Date, required: true, default: Date.now },  // Timestamp of the transaction
});

// Export the model based on the schema
module.exports = mongoose.model('UserTransaction', userTransactionSchema);