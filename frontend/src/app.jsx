import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import BudgetForm from "./Components/budgetform";
import BudgetList from "./Components/budgetlist";
import Summary from "./Components/summary";

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
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/MyBudgeter' : '/'}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">Budget Planner</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Total Items: {budgets.length}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Budget Item</h2>
                <BudgetForm onAdd={addBudget} />
              </div>
            </div>

            {/* Right Column - List and Summary */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary Cards */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Summary budgets={budgets} onClear={clearBudgets} />
              </div>

              {/* Budget List */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Budget Items</h2>
                  {budgets.length > 0 && (
                    <button
                      onClick={clearBudgets}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <BudgetList budgets={budgets} onDelete={deleteBudget} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
