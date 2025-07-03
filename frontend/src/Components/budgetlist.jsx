import { useState } from 'react';

function BudgetList({ budgets, onDelete }) {
  if (budgets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No budgets added yet</p>
        <p className="text-gray-400 text-sm mt-2">Add your first budget item to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget, index) => (
        <div key={budget.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{budget.description}</h3>
            <p className="text-gray-600">Amount: ${budget.amount.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">Date: {new Date(budget.date).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => onDelete(budget.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BudgetList;