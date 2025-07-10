import { useState } from "react";

function BudgetForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Income',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid positive amount");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    if (!category) {
      alert("Please select a category");
      return;
    }

    onAdd({ 
      amount: type === 'expense' ? -parsedAmount : parsedAmount, 
      description: description.trim(), 
      date, 
      category,
      type 
    });

    // Clear inputs after submit
    setAmount('');
    setDescription('');
    setDate('');
    setCategory('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="expense"
              checked={type === 'expense'}
              onChange={(e) => setType(e.target.value)}
              className="mr-2"
            />
            <span className="text-red-600">Expense</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="income"
              checked={type === 'income'}
              onChange={(e) => setType(e.target.value)}
              className="mr-2"
            />
            <span className="text-green-600">Income</span>
          </label>
        </div>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0.01"
            step="0.01"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="Enter description"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
      >
        Add {type === 'expense' ? 'Expense' : 'Income'}
      </button>
    </form>
  );
}

export default BudgetForm;