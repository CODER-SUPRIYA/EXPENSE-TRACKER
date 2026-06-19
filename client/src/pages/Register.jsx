import { useState } from "react"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()
    console.log("Name:", name)
    console.log("Email:", email)
    console.log("Password:", password)
    alert("Register button clicked! We will connect to backend soon.")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register