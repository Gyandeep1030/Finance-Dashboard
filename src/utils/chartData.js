/**
 * Process transactions to get balance trend over time
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of data points with date and balance
 */
export const getBalanceTrendData = (transactions) => {
  if (!transactions.length) return [];

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Create a map to group by date and track balance
  const balanceMap = new Map();
  let cumulativeBalance = 0;

  sortedTransactions.forEach((transaction) => {
    const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
    cumulativeBalance += amount;

    // Format date as YYYY-MM-DD
    const dateKey = transaction.date;
    
    // Keep the latest balance for each date
    balanceMap.set(dateKey, cumulativeBalance);
  });

  // Convert map to array of chart-ready objects
  return Array.from(balanceMap, ([date, balance]) => ({
    date,
    balance: parseFloat(balance.toFixed(2)),
  }));
};

/**
 * Process transactions to get category breakdown for expenses
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of categories with expense amounts
 */
export const getCategoryBreakdownData = (transactions) => {
  if (!transactions.length) return [];

  // Filter only expenses and group by category
  const categoryMap = new Map();

  transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      const category = transaction.category;
      const amount = transaction.amount;

      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + amount);
      } else {
        categoryMap.set(category, amount);
      }
    });

  // Convert map to array of chart-ready objects with colors
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7c7c',
    '#8dd1e1',
    '#d084d0',
    '#82d982',
    '#ffa07a',
    '#87ceeb',
    '#dda15e',
  ];

  return Array.from(categoryMap, ([name, value], index) => ({
    name,
    value: parseFloat(value.toFixed(2)),
    fill: colors[index % colors.length],
  })).sort((a, b) => b.value - a.value);
};
