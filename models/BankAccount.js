const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  accountId: {
    type: String,
    trim: true,
  },
  accountType: {
    type: String,
    trim: true
  },
  balance: {
    type: Number,
    trim: true,
  },
  timestamp: {
    type: Date
  }
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);