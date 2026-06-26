const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'expense_tracker_secret_key'

const users = []
let nextId = 1

router.post('/register', (req, res) => {
  console.log('Register body:', req.body)
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields required' })

  const existing = users.find(u => u.email === email)
  if (existing)
    return res.status(400).json({ error: 'Email already registered' })

  const user = { id: nextId++, name, email, password }
  users.push(user)

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
})

router.post('/login', (req, res) => {
  console.log('Login body:', req.body)
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (!user)
    return res.status(400).json({ error: 'Invalid email or password' })

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
})

module.exports = router
module.exports.JWT_SECRET = JWT_SECRET