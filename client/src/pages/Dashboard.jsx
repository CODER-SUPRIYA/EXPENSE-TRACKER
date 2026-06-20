import { useState, useEffect } from "react"
import { addExpense, getExpenses, deleteExpense } from "../api/expenses"

function Dashboard() {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")
  const [expenses, setExpenses] = useState([])

  const fetchExpenses = async () => {
    const data = await getExpenses()
    setExpenses(data)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleAddExpense = async (e) => {
    e.preventDefault()
    await addExpense({ amount, category, date, note })
    setAmount("")
    setCategory("Food")
    setDate("")
    setNote("")
    fetchExpenses()
  }

  const handleDelete = async (id) => {
    await deleteExpense(id)
    fetchExpenses()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Expense Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
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
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Add Expense
          </button>
        </form>
      </div>

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
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard