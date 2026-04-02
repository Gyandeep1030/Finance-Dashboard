import {
  getHighestSpendingCategory,
  getMonthlyComparison,
  calculateBalance,
  calculateIncome,
  calculateExpenses,
} from '../../utils/calculations';
import { WalletIcon, TagIcon, WarningIcon, BarChartIcon } from '../icons/InsightIcons';
import '../../styles/insights.css';

/**
 * Insights Component
 * 
 * Displays financial insights including:
 * - Loading, error, and empty states
 * - Total savings and highest spending category
 * - Monthly income vs. expenses comparison table
 * 
 * All calculations are derived directly from props, no unnecessary state.
 */
export default function Insights({ transactions, loading, error }) {
  // Derived values - computed only when needed, no unnecessary state
  const highestCategory = transactions?.length > 0 
    ? getHighestSpendingCategory(transactions) 
    : null;
  
  const monthlyData = transactions?.length > 0 
    ? getMonthlyComparison(transactions) 
    : [];
  
  const totalSavings = transactions?.length > 0
    ? calculateBalance(transactions)
    : 0;
  
  const totalIncome = transactions?.length > 0 
    ? calculateIncome(transactions) 
    : 0;
  
  const totalExpenses = transactions?.length > 0 
    ? calculateExpenses(transactions) 
    : 0;

  // Loading state
  if (loading) {
    return (
      <div className="insights-container">
        <div className="insights-loading">
          <div className="loading-spinner"></div>
          <p>Loading insights...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="insights-container">
        <div className="insights-error">
          <WarningIcon className="error-icon" />
          <p className="error-message">Error loading insights: {error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!transactions || transactions.length === 0) {
    return (
      <div className="insights-container">
        <div className="insights-empty-state">
          <BarChartIcon className="empty-icon" />
          <h3>No Data Available</h3>
          <p>Add some transactions to see insights and spending patterns.</p>
        </div>
      </div>
    );
  }

  // Format month name from YYYY-MM string
  const formatMonth = (monthStr) => {
    return new Date(monthStr + '-01').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="insights-container">
      <h2>Financial Insights</h2>

      <div className="insights-grid">
        {/* Total Savings Card */}
        <div className="insight-card savings-card">
          <div className="card-header">
            <h3>Total Savings</h3>
            <WalletIcon className="icon" />
          </div>
          <div className="card-content">
            <p className={`amount ${totalSavings >= 0 ? 'positive' : 'negative'}`}>
              {totalSavings >= 0 ? '+' : '-'}${Math.abs(totalSavings).toFixed(2)}
            </p>
            <p className="card-description">
              Income: ${totalIncome.toFixed(2)} | Expenses: ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Highest Spending Category Card */}
        {highestCategory && (
          <div className="insight-card category-card">
            <div className="card-header">
              <h3>Highest Spending</h3>
              <TagIcon className="icon" />
            </div>
            <div className="card-content">
              <p className="category-name">{highestCategory.category}</p>
              <p className="amount">${highestCategory.amount.toFixed(2)}</p>
              <p className="card-description">
                {((highestCategory.amount / totalExpenses) * 100).toFixed(1)}% of total expenses
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Comparison Table */}
      <div className="monthly-comparison">
        <h3>Monthly Income vs Expenses</h3>
        <div className="monthly-table">
          <div className="table-header">
            <div className="table-cell month-cell">Month</div>
            <div className="table-cell income-cell">Income</div>
            <div className="table-cell expense-cell">Expenses</div>
            <div className="table-cell balance-cell">Net</div>
          </div>
          {monthlyData.map((month) => {
            const netBalance = month.income - month.expenses;
            return (
              <div key={month.month} className="table-row">
                <div className="table-cell month-cell">
                  {formatMonth(month.month)}
                </div>
                <div className="table-cell income-cell">
                  ${month.income.toFixed(2)}
                </div>
                <div className="table-cell expense-cell">
                  ${month.expenses.toFixed(2)}
                </div>
                <div className={`table-cell balance-cell ${netBalance >= 0 ? 'positive' : 'negative'}`}>
                  {netBalance >= 0 ? '+' : '-'}${Math.abs(netBalance).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
