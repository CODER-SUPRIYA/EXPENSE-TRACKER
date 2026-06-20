require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' })
})

const expenseRoutes = require('./routes/expenses')
app.use('/api/expenses', expenseRoutes)

const budgetRoutes = require('./routes/budget')
app.use('/api/budget', budgetRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})