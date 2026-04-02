import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../store/slices/transactionSlice';
import AddTransactionForm from './AddTransactionForm';

export default function TransactionRow({ transaction }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.ui.role);
  const { id, date, category, amount, type } = transaction;
  const isIncome = type === 'income';
  const isAdmin = role === 'admin';

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this transaction?`)) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <tr className="table-body-row">
      <td className="table-cell">{date}</td>
      <td className="table-cell">{category}</td>
      <td className={`table-cell amount ${isIncome ? 'income' : 'expense'}`}>
        {isIncome ? '+' : '-'}${amount.toFixed(2)}
      </td>
      <td className="table-cell">
        <span className={`type-badge ${type}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </td>
      {isAdmin && (
        <td className="table-cell actions-cell">
          <AddTransactionForm
            transaction={transaction}
            triggerLabel="Edit"
            triggerClassName="action-button edit-button"
            triggerAriaLabel={`Edit ${category} transaction`}
            triggerTitle={`Edit ${category} transaction`}
          />
          <button
            onClick={handleDelete}
            className="action-button delete-button"
            title="Delete transaction"
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}
