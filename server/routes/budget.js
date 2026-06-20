const express = require('express')
const router = express.Router()
const Budget = require('../models/Budget')

// Set or update budget for a month
router.post('/', async (req, res) => {
  try {
    const { month, amount } = req.body
    let budget = await Budget.findOne({ month })
    if (budget) {
      budget.amount = amount
      await budget.save()
    } else {
      budget = new Budget({ month, amount })
      await budget.save()
    }
    res.status(201).json(budget)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get budget for a month
router.get('/:month', async (req, res) => {
  try {
    const budget = await Budget.findOne({ month: req.params.month })
    res.json(budget || { amount: 0 })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router