import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💰</span>
        <span className="text-xl font-bold text-purple-600">ExpenseTracker</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:block">
          Hi, {user.name || "User"} 👋
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar