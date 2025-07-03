import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import BudgetForm from "./src/components/budgetform";
import BudgetList from "./src/components/budgetlist";
import Summary from "./src/components/summary";

function App() {
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets from backend on component mount
  useEffect(() => {
    async function fetchBudgets() {
      try {
        const response = await fetch("/.netlify/functions/api/budgets");
        if (!response.ok) throw new Error("Failed to fetch budgets");
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchBudgets();
  }, []);

  // Add a new budget item
  async function addBudget(newBudget) {
    try {
      const response = await fetch("/.netlify/functions/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      });
      if (!response.ok) throw new Error("Failed to add budget");
      const added = await response.json();
      setBudgets((prev) => [added[0], ...prev]); // Supabase returns inserted row(s) in an array
    } catch (error) {
      console.error(error.message);
    }
  }

  // Delete a budget by id
  async function deleteBudget(id) {
    try {
      const response = await fetch(`/.netlify/functions/api/budgets/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete budget");
      setBudgets((prev) => prev.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  // Clear all budgets locally (optional)
  function clearBudgets() {
    setBudgets([]);
    // Optionally: implement backend clearing as well if you want
  }

  return (
    <BrowserRouter basename="/MyBudgeter">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Budget Planner</h1>

        <BudgetForm onAdd={addBudget} />
        <BudgetList budgets={budgets} onDelete={deleteBudget} />
        <Summary budgets={budgets} onClear={clearBudgets} />
      </div>
    </BrowserRouter>
  );
}

export default App;
