import { useSelector } from 'react-redux';
import TransactionRow from './TransactionRow';
import '../../styles/table.css';

/**
 * TransactionTable Component
 *
 * Displays a table of transactions with:
 * - Filtering by type (income/expense)
 * - Search by category or date
 * - Sorting by date or amount
 * - Configurable sort order (ascending/descending)
 * - Action buttons for admins (edit/delete)
 *
 * The component handles:
 * 1. Retrieving transactions and filter/sort state from Redux
 * 2. Applying filters and sorting logic
 * 3. Rendering appropriate empty/no-results states
 * 4. Conditional rendering of admin action buttons
 */
export default function TransactionTable() {
  // Select transaction list from Redux
  const transactions = useSelector((state) => state.transactions.transactions);

  // Select filter and sort settings from Redux
  const { filters, sort } = useSelector((state) => state.ui);

  // Select user role to determine if action buttons should be shown
  const role = useSelector((state) => state.ui.role);
  const isAdmin = role === 'admin';

  /**
   * Apply filters and sorting to transactions
   *
   * Filter Logic:
   * - Type: If a type filter is set, only show that type (income or expense)
   * - Search: Match both category (case-insensitive) and date
   *
   * Sort Logic:
   * - Date: Convert to Date objects for accurate comparison
   * - Amount: Compare numeric values
   * - Order: Apply ascending or descending based on sort.sortOrder
   */
  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      // Apply type filter (income/expense)
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      // Apply search filter - match category or date
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const categoryMatch = transaction.category.toLowerCase().includes(searchLower);
        const dateMatch = transaction.date.includes(filters.search);
        if (!categoryMatch && !dateMatch) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      let compareValue = 0;

      // Sort by date (convert to Date objects for accurate comparison)
      if (sort.sortBy === 'date') {
        compareValue = new Date(a.date) - new Date(b.date);
      }
      // Sort by amount
      else if (sort.sortBy === 'amount') {
        compareValue = a.amount - b.amount;
      }

      // Apply sort order (ascending or descending)
      return sort.sortOrder === 'asc' ? compareValue : -compareValue;
    });

  if (transactions.length === 0) {
    return (
      <div className="table-wrapper">
        <p className="table-empty">No transactions available</p>
      </div>
    );
  }

  if (filteredAndSortedTransactions.length === 0) {
    return (
      <div className="table-wrapper">
        <p className="table-empty">No transactions match your filters</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header-cell">Date</th>
            <th className="table-header-cell">Category</th>
            <th className="table-header-cell">Amount</th>
            <th className="table-header-cell">Type</th>
            {isAdmin && <th className="table-header-cell">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTransactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
