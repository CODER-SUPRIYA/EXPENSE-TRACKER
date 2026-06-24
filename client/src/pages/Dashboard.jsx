import { addExpense, getExpenses, deleteExpense, updateExpense } from "../api/expenses"
import { useState, useEffect } from "react"
import { setBudget, getBudget } from "../api/budget"
import { Pie, Bar } from "react-chartjs-2"
import Navbar from "../components/Navbar"

import { useNavigate } from "react-router-dom"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function Dashboard() {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")
  const [expenses, setExpenses] = useState([])
  const [budgetInput, setBudgetInput] = useState("")
  const [budget, setBudgetValue] = useState(0)
  const [editingId, setEditingId] = useState(null)

  const currentMonth = new Date().toISOString().slice(0, 7) // e.g. "2026-06"

  const fetchExpenses = async () => {
    const data = await getExpenses()
    setExpenses(data)
  }

  const fetchBudget = async () => {
    const data = await getBudget(currentMonth)
    setBudgetValue(data.amount || 0)
  }

 const navigate = useNavigate()

useEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) {
    navigate("/login")
  }
}, [])



  const handleAddExpense = async (e) => {
  e.preventDefault()
  if (editingId) {
    await updateExpense(editingId, { amount, category, date, note })
    setEditingId(null)
  } else {
    await addExpense({ amount, category, date, note })
  }
  setAmount("")
  setCategory("Food")
  setDate("")
  setNote("")
  fetchExpenses()
}
  const handleEditClick = (exp) => {
  setEditingId(exp._id)
  setAmount(exp.amount)
  setCategory(exp.category)
  setDate(exp.date?.slice(0, 10))
  setNote(exp.note || "")
}

  const handleDelete = async (id) => {
    await deleteExpense(id)
    fetchExpenses()
  }

  const handleSetBudget = async (e) => {
    e.preventDefault()
    await setBudget(currentMonth, Number(budgetInput))
    setBudgetInput("")
    fetchBudget()
  }

  // Calculate total spent this month
  const monthExpenses = expenses.filter(
    (exp) => exp.date?.slice(0, 7) === currentMonth
  )
  const totalSpent = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const percentUsed = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0

  // Category-wise data for pie chart
  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"]
  const categoryTotals = categories.map((cat) =>
    monthExpenses
      .filter((exp) => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0)
  )

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: ["#a855f7", "#3b82f6", "#f59e0b", "#ef4444", "#10b981"]
      }
    ]
  }

  // Daily spending for bar chart
  const dailyTotals = {}
  monthExpenses.forEach((exp) => {
    const day = exp.date?.slice(8, 10)
    dailyTotals[day] = (dailyTotals[day] || 0) + exp.amount
  })

  const barData = {
    labels: Object.keys(dailyTotals),
    datasets: [
      {
        label: "Daily Spending",
        data: Object.values(dailyTotals),
        backgroundColor: "#a855f7"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
  <Navbar />
  <div className="p-6"></div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Expense Dashboard</h1>


      {/* Budget Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 max-w-4xl mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Budget</h2>
        <form onSubmit={handleSetBudget} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="number"
            placeholder="Set budget amount"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button type="submit"  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
          Set
          </button>
        </form>
        <p className="text-sm text-gray-600 mb-2">
          ₹{totalSpent} spent of ₹{budget} budget
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              percentUsed >= 80 ? "bg-red-500" : "bg-purple-600"
            }`}
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
        {percentUsed >= 80 && (
          <p className="text-red-500 text-sm mt-2 font-medium">
            Warning: You've used {Math.round(percentUsed)}% of your budget!
          </p>
        )}
      </div>

      {/* Add Expense Form */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Expense" : "Add Expense"}</h2>
        <form onSubmit={handleAddExpense}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Other</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
         <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
            {editingId ? "Update Expense" : "Add Expense"}
            </button>
          </form>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          {totalSpent > 0 ? (
            <Pie data={pieData} />
          ) : (
            <p className="text-gray-500 text-center">No data yet</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Spending</h2>
          {totalSpent > 0 ? (
            <Bar data={barData} />
          ) : (
            <p className="text-gray-500 text-center">No data yet</p>
          )}
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expenses yet.</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li
                key={exp._id}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    ₹{exp.amount} - {exp.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exp.date?.slice(0, 10)} {exp.note && `- ${exp.note}`}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                  onClick={()=>handleEditClick(exp)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  Edit
                  </button>
                  <button onClick={() => handleDelete(exp._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
             >
              Delete
              </button>
              </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard