import { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetList from "./components/BudgetList";
import Summary from "./components/Summary";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (amount) => {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) return;
  
  setItems([{ id: Date.now(), amount: parsedAmount }, ...items]);
};

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearItems = () => {
    setItems([]);
  };

  const formatCurrency = (amount) => {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Budget Planner</h1>
      
      <BudgetForm onAdd={addItem} />
      
      <BudgetList items={items} onDelete={deleteItem} />
      
      <Summary items={items} onClear={clearItems} />
    </div>
  );
}

export default App;
