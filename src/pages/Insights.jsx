import { useSelector } from 'react-redux';
import { useTransactionLoader } from '../hooks/useTransactionLoader';
import InsightsComponent from '../components/insights/Insights';
import AddTransactionForm from '../components/transactions/AddTransactionForm';

/**
 * Insights Page Component
 *
 * Displays:
 * - Financial insights with savings and spending patterns
 * - Monthly income vs expenses comparison
 */
export default function Insights() {
  useTransactionLoader();

  const { transactions, loading, error } = useSelector(
    (state) => state.transactions
  );

  const role = useSelector((state) => state.ui.role);
  const isAdmin = role === 'admin';

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>Insights</h2>
      </div>
      {isAdmin && <AddTransactionForm />}
      <InsightsComponent transactions={transactions} loading={loading} error={error} />
    </div>
  );
}
