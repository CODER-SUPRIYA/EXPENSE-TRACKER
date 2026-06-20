const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')

// Add new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body)
    await expense.save()
    res.status(201).json(expense)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedExpense)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id)
    res.json({ message: 'Expense deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router