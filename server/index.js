const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: "https://expense-tracker-pi-cyan-60.vercel.app",
  credentials: true
}))
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' })
})

const expenseRoutes = require('./routes/expenses')
app.use('/api/expenses', expenseRoutes)

const budgetRoutes = require('./routes/budget')
app.use('/api/budget', budgetRoutes)

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})