function Summary({ budgets, onClear }) {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📈</div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Budget Summary</h2>
        <p className="text-gray-700">No budget items yet. Add some income or expenses to see your financial overview!</p>
      </div>
    );
  }

  const income = budgets.filter(b => b.amount > 0).reduce((sum, b) => sum + b.amount, 0);
  const expenses = budgets.filter(b => b.amount < 0).reduce((sum, b) => sum + Math.abs(b.amount), 0);
  const balance = income - expenses;
  
  const totalItems = budgets.length;
  const incomeItems = budgets.filter(b => b.amount > 0).length;
  const expenseItems = budgets.filter(b => b.amount < 0).length;

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  // Get category breakdown
  const categoryBreakdown = budgets.reduce((acc, budget) => {
    const category = budget.category || 'Other';
    acc[category] = (acc[category] || 0) + Math.abs(budget.amount);
    return acc;
  }, {});

  const topCategories = Object.entries(categoryBreakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Financial Overview</h2>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Income</p>
              <p className="text-2xl font-bold">{formatter.format(income)}</p>
              <p className="text-green-100 text-sm">{incomeItems} items</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold">{formatter.format(expenses)}</p>
              <p className="text-red-100 text-sm">{expenseItems} items</p>
            </div>
            <div className="text-3xl">📉</div>
          </div>
        </div>

        <div className={`bg-gradient-to-r ${
          balance >= 0 
            ? 'from-blue-400 to-blue-500' 
            : 'from-orange-400 to-orange-500'
        } text-white p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Net Balance</p>
              <p className="text-2xl font-bold">{formatter.format(balance)}</p>
              <p className="text-blue-100 text-sm">
                {balance >= 0 ? '✅ Positive' : '⚠️ Negative'}
              </p>
            </div>
            <div className="text-3xl">{balance >= 0 ? '💰' : '⚠️'}</div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">📊 Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            <p className="text-sm text-gray-600">Total Items</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {expenses > 0 ? ((income / expenses) * 100).toFixed(0) : 0}%
            </p>
            <p className="text-sm text-gray-600">Income Ratio</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {formatter.format(income > 0 ? income / incomeItems : 0)}
            </p>
            <p className="text-sm text-gray-600">Avg Income</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {formatter.format(expenses > 0 ? expenses / expenseItems : 0)}
            </p>
            <p className="text-sm text-gray-600">Avg Expense</p>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      {topCategories.length > 0 && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">🏆 Top Categories</h3>
          <div className="space-y-3">
            {topCategories.map(([category, amount], index) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                  <span className="font-medium">{category}</span>
                </div>
                <span className="font-bold text-gray-700">{formatter.format(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear Button */}
      {budgets.length > 0 && (
        <div className="text-center">
          <button
            onClick={onClear}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            🗑️ Clear All Data
          </button>
        </div>
      )}
    </div>
  );
}

export default Summary;