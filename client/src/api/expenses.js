const API_URL = "https://expense-tracker-api-5a21.onrender.com/api/expenses"
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}

export const addExpense = async (expenseData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(expenseData)
  })
  return res.json()
}

export const getExpenses = async () => {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders()
  })
  return res.json()
}

export const deleteExpense = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  })
  return res.json()
}

export const updateExpense = async (id, expenseData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(expenseData)
  })
  return res.json()
}