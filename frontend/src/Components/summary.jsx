function Summary({ budgets }) {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
        <p className="text-gray-700">No budget items yet.</p>
      </div>
    );
  }

  const amounts = budgets.map(b => b.amount);
  const total = amounts.reduce((acc, curr) => acc + curr, 0);
  const average = total / budgets.length;
  const highest = Math.max(...amounts);
  const lowest = Math.min(...amounts);

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
      <p className="text-gray-700">Total: {formatter.format(total)}</p>
      <p className="text-gray-700">Average: {formatter.format(average)}</p>
      <p className="text-gray-700">Highest: {formatter.format(highest)}</p>
      <p className="text-gray-700">Lowest: {formatter.format(lowest)}</p>
    </div>
  );
}

export default Summary;