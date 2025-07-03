import { useState, useEffect } from "react";
import BudgetForm from "./src/components/budgetform";
import BudgetList from "./src/components/budgetlist";
import Summary from "./src/components/summary";

function App() {
  
  const [budgets, setBudgets] = useState(() => {
    const stored = localStorage.getItem("budgets");
    return stored ? JSON.parse(stored) : [];
  });

  const addBudget = (budget) => {
    setBudgets([...budgets, { ...budget, id: Date.now() }]);
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const clearBudgets = () => {
    setBudgets([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold">Budget Planner</h1>

      <BudgetForm onAdd={addBudget} />

      <BudgetList budgets={budgets} onDelete={deleteBudget} />

      <Summary budgets={budgets} />
    </div>
  );
}

export default App;