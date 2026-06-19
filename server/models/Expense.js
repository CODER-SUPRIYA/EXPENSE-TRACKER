const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema)