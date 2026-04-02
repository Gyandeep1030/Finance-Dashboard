import { useSelector } from 'react-redux';
import { useTransactionLoader } from '../hooks/useTransactionLoader';
import { exportToCSV, exportToJSON } from '../utils/exportData';
import SummaryCard from '../components/cards/SummaryCard';
import BalanceLineChart from '../components/charts/BalanceLineChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import AddTransactionForm from '../components/transactions/AddTransactionForm';

/**
 * Dashboard Page Component
 *
 * Main page displaying:
 * - Transaction summary cards (balance, income, expenses)
 * - Balance trend chart over time
 * - Category breakdown pie chart
 * - Financial insights panel with savings and highest spending
 * - Transaction filters and searchable table
 * - Add transaction form (admin only)
 *
 * Data Flow:
 * 1. Load transactions from localStorage or API via useTransactionLoader hook
 * 2. Select transaction data, loading state, and error from Redux
 * 3. Conditionally render components based on loading/error states
 * 4. Show admin-only features (AddTransactionForm) based on user role
 *
 * The dashboard supports two roles:
 * - "admin": Can add, edit, and delete transactions
 * - "viewer": Can only view transactions and insights (read-only)
 */
export default function Dashboard() {
  // Trigger transaction loading effect (loads from localStorage first, then API)
  useTransactionLoader();

  // Select transaction data and metadata from Redux store
  const { transactions, loading, error } = useSelector(
    (state) => state.transactions
  );

  const role = useSelector((state) => state.ui.role);
  const isAdmin = role === 'admin';
  const userName = useSelector((state) => state.ui.user.name);

  if (loading) {
    return <div className="dashboard-content"><p>Loading transactions...</p></div>;
  }

  if (error) {
    return (
      <div className="dashboard-content">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>Welcome to Finance Dashboard - {userName}</h2>
        <div className="dashboard-actions">
          <button
            onClick={() => exportToCSV(transactions)}
            className="export-button export-csv-button"
            title="Download transactions as CSV"
          >
            Download CSV
          </button>
          <button
            onClick={() => exportToJSON(transactions)}
            className="export-button export-json-button"
            title="Download transactions as JSON"
          >
            Download JSON
          </button>
        </div>
      </div>

      {isAdmin && <AddTransactionForm />}

      {transactions.length > 0 ? (
        <>
          <SummaryCard />
          <p>Total Transactions: {transactions.length}</p>
          <div className="charts-container">
            <BalanceLineChart />
            <CategoryPieChart />
          </div>
        </>
      ) : (
        <div className="dashboard-empty-state">
          <h3>No transactions yet</h3>
          <p>
            Add your first transaction to populate the balance summary, charts,
            and insights across the dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
