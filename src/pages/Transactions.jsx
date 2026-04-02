import { useSelector } from 'react-redux';
import { useTransactionLoader } from '../hooks/useTransactionLoader';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionForm from '../components/transactions/AddTransactionForm';

/**
 * Transactions Page Component
 *
 * Displays:
 * - Transaction filters and search
 * - Transaction table with all transactions
 * - Add transaction form (admin only)
 */
export default function Transactions() {
  useTransactionLoader();

  const { loading, error } = useSelector(
    (state) => state.transactions
  );

  const role = useSelector((state) => state.ui.role);
  const isAdmin = role === 'admin';

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
        <h2>Transactions</h2>
      </div>
      {isAdmin && <AddTransactionForm />}
      <TransactionFilters />
      <TransactionTable />
    </div>
  );
}
