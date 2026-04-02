/**
 * Calculate total income from transactions
 *
 * Logic:
 * 1. Filter to include only transactions with type === 'income'
 * 2. Sum all amounts using reduce
 * 3. Returns 0 if no income transactions exist
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total income amount (sum of all income transactions)
 */
export const calculateIncome = (transactions) => {
  return transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

/**
 * Calculate total expenses from transactions
 *
 * Logic:
 * 1. Filter to include only transactions with type === 'expense'
 * 2. Sum all amounts using reduce
 * 3. Returns 0 if no expense transactions exist
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total expenses amount (sum of all expense transactions)
 */
export const calculateExpenses = (transactions) => {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

/**
 * Calculate balance (income - expenses)
 *
 * Logic:
 * 1. Calculate total income
 * 2. Calculate total expenses
 * 3. Return the difference (balance = income - expenses)
 * 4. Positive balance indicates surplus, negative indicates deficit
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Balance amount (income - expenses)
 */
export const calculateBalance = (transactions) => {
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);
  return income - expenses;
};

/**
 * Get the highest spending category
 *
 * Logic:
 * 1. Filter to include only expense transactions
 * 2. Return null if no expenses exist
 * 3. Group expenses by category and sum amounts in each group
 * 4. Find the category with the highest total amount
 * 5. Return category name and total amount
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object|null} Object with category and amount { category, amount }, or null if no expenses
 */
export const getHighestSpendingCategory = (transactions) => {
  // Get all expense transactions
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return null;

  // Group expenses by category and calculate totals for each
  const categoryTotals = {};
  expenses.forEach((transaction) => {
    categoryTotals[transaction.category] =
      (categoryTotals[transaction.category] || 0) + transaction.amount;
  });

  // Find the category with the maximum amount
  const highest = Object.entries(categoryTotals).reduce((max, [category, amount]) =>
    amount > max.amount ? { category, amount } : max,
    { category: '', amount: 0 }
  );

  return highest;
};

/**
 * Get monthly comparison data (income vs expenses by month)
 *
 * Logic:
 * 1. Extract year and month from each transaction date (YYYY-MM format)
 * 2. Group transactions by month, separating income and expenses
 * 3. Calculate totals for each month
 * 4. Return array sorted chronologically (oldest first)
 *
 * @param {Array} transactions - Array of transaction objects with date in YYYY-MM-DD format
 * @returns {Array} Array of month objects sorted chronologically
 *                  Each object has: { month: 'YYYY-MM', income: number, expenses: number }
 */
export const getMonthlyComparison = (transactions) => {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    // Extract YYYY-MM from date string
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    // Initialize month data if it doesn't exist
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthKey, income: 0, expenses: 0 };
    }

    // Add amount to appropriate category (income or expense)
    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });

  // Convert to array and sort chronologically by month
  return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Calculate total savings (alias for calculateBalance)
 * Kept for backwards compatibility. Use calculateBalance directly.
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total savings amount
 * @deprecated Use calculateBalance instead
 */
export const calculateTotalSavings = (transactions) => {
  return calculateBalance(transactions);
};
