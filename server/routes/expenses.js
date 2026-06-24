const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')
const authMiddleware = require('../middleware/auth')

// Add new expense
router.post('/', authMiddleware, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, userId: req.userId })
    await expense.save()
    res.status(201).json(expense)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update an expense
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    )
    res.json(updatedExpense)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all expenses for logged-in user only
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ date: -1 })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete an expense
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    res.json({ message: 'Expense deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router