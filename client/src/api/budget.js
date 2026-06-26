const API_URL = "http://localhost:5000/api/budget"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}

export const setBudget = async (month, amount) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ month, amount })
  })
  return res.json()
}

export const getBudget = async (month) => {
  const res = await fetch(`${API_URL}/${month}`, {
    headers: getAuthHeaders()
  })
  return res.json()
}