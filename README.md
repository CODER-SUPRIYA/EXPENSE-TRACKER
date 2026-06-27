# 💰 Expense Tracker

A full-stack expense tracking web app that helps you manage your monthly spending, set budgets, and visualize your expenses with charts.

🔗 **Live Demo:** [expense-tracker-pi-cyan-60.vercel.app](https://expense-tracker-pi-cyan-60.vercel.app)

---

## ✨ Features

- 🔐 **User Authentication** — Register and login with JWT-based auth
- ➕ **Add / Edit / Delete Expenses** — Full CRUD with form validation
- 📅 **Monthly Budget** — Set a budget and track how much you've spent
- 📊 **Charts** — Pie chart for category breakdown, Bar chart for daily spending
- ⚠️ **Budget Alerts** — Warning when you exceed 80% of your budget
- 📱 **Responsive Design** — Works on mobile and desktop

---

## 🛠️ Tech Stack

**Frontend:** React.js (Vite), Tailwind CSS, Chart.js, React Router DOM

**Backend:** Node.js, Express.js, JWT

**Deployment:** Frontend → Vercel, Backend → Render

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/CODER-SUPRIYA/EXPENSE-TRACKER.git
cd EXPENSE-TRACKER
```

### 2. Run the Backend
```bash
cd server
npm install
node index.js
```

### 3. Run the Frontend
```bash
cd client
npm install
npm run dev
```

---

## 📁 Project Structure
expense-tracker/

├── client/

│   ├── src/

│   │   ├── api/

│   │   ├── components/

│   │   └── pages/

│   └── vercel.json

└── server/

├── routes/

├── middleware/

└── index.js

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/budget/:month` | Get budget for a month |
| POST | `/api/budget` | Set budget for a month |

---

## 👨‍💻 Author

**Supriya** — [GitHub](https://github.com/CODER-SUPRIYA)