import { useState } from 'react';

function BudgetList({ budgets, onDelete }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  if (budgets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No budgets added yet</p>
        <p className="text-gray-400 text-sm mt-2">Add your first budget item to get started!</p>
      </div>
    );
  }

  // Filter budgets
  const filteredBudgets = budgets.filter(budget => {
    if (filter === 'income') return budget.amount > 0;
    if (filter === 'expense') return budget.amount < 0;
    return true;
  });

  // Sort budgets
  const sortedBudgets = filteredBudgets.sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'amount') return Math.abs(b.amount) - Math.abs(a.amount);
    return 0;
  });

  const getCategoryIcon = (category) => {
    const icons = {
      'Food & Dining': '🍕',
      'Transportation': '🚗',
      'Shopping': '🛒',
      'Entertainment': '🎬',
      'Bills & Utilities': '⚡',
      'Healthcare': '🏥',
      'Education': '📚',
      'Travel': '✈️',
      'Income': '💰',
      'Other': '📝'
    };
    return icons[category] || '📝';
  };

  return (
    <div className="space-y-4">
      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'income' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'expense' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Expenses
          </button>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* Budget Items */}
      <div className="space-y-3">
        {sortedBudgets.map((budget) => (
          <div 
            key={budget.id} 
            className={`bg-white border-l-4 ${
              budget.amount >= 0 ? 'border-green-400' : 'border-red-400'
            } shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getCategoryIcon(budget.category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{budget.description}</h3>
                    <p className="text-sm text-gray-500">{budget.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className={`font-bold text-lg ${
                    budget.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {budget.amount >= 0 ? '+' : ''}${Math.abs(budget.amount).toFixed(2)}
                  </span>
                  <span>{new Date(budget.date).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={() => onDelete(budget.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                title="Delete item"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetList;