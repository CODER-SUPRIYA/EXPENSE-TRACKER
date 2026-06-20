const API_URL = "http://localhost:5000/api/budget"

export const setBudget = async (month, amount) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ month, amount })
  })
  return res.json()
}

export const getBudget = async (month) => {
  const res = await fetch(`${API_URL}/${month}`)
  return res.json()
}