const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')

const expenses = []
let nextId = 1

router.use(authMiddleware)

router.get('/', (req, res) => {
  const userExpenses = expenses
    .filter(e => e.userId === req.userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  res.json(userExpenses)
})

router.post('/', (req, res) => {
  const { amount, category, date, note } = req.body
  const expense = { _id: String(nextId++), userId: req.userId, amount: Number(amount), category, date, note: note || '' }
  expenses.push(expense)
  res.json(expense)
})

router.put('/:id', (req, res) => {
  const idx = expenses.findIndex(e => e._id === req.params.id && e.userId === req.userId)
  if (idx === -1) return res.status(404).json({ error: 'Expense not found' })
  const { amount, category, date, note } = req.body
  expenses[idx] = { ...expenses[idx], amount: Number(amount), category, date, note: note || '' }
  res.json(expenses[idx])
})

router.delete('/:id', (req, res) => {
  const idx = expenses.findIndex(e => e._id === req.params.id && e.userId === req.userId)
  if (idx === -1) return res.status(404).json({ error: 'Expense not found' })
  expenses.splice(idx, 1)
  res.json({ message: 'Deleted successfully' })
})

module.exports = router