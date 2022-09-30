
const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  paymentAmount: {
    type: Number,
    required: "Payment Amount is required"
  },
  walletAddress: {
    type: String,
    required: "Wallet Address is required"
  },
  currency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: "Status is required"
  }, 
  owner: {type: mongoose.Schema.ObjectId, ref: "User"},
  date: {
    type: Date,
    default: Date.now
  },
  transactionType: {
    type: String,
    required: "Transaction type is required"
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
