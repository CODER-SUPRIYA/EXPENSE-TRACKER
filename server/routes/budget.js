const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')

const budgets = {}

router.use(authMiddleware)

router.get('/:month', (req, res) => {
  const key = `${req.userId}_${req.params.month}`
  res.json({ amount: budgets[key] || 0 })
})

router.post('/', (req, res) => {
  const { month, amount } = req.body
  const key = `${req.userId}_${month}`
  budgets[key] = Number(amount)
  res.json({ month, amount: budgets[key] })
})

module.exports = router