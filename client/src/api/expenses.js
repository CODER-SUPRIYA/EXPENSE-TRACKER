const API_URL = "http://localhost:5000/api/expenses"

export const addExpense = async (expenseData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenseData)
  })
  return res.json()
}

export const getExpenses = async () => {
  const res = await fetch(API_URL)
  return res.json()
}

export const deleteExpense = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
  return res.json()
}
export const updateExpense = async (id, expenseData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenseData)
  })
  return res.json()
}