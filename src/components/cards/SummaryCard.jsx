import { useSelector } from 'react-redux';
import { calculateBalance, calculateIncome, calculateExpenses } from '../../utils/calculations';
import '../../styles/cards.css';

/**
 * SummaryCard Component
 * 
 * Displays three summary cards showing:
 * - Total balance (income - expenses)
 * - Total income
 * - Total expenses
 * 
 * Reads transactions from Redux store and calculates metrics on-the-fly.
 */
export default function SummaryCard() {
  const transactions = useSelector((state) => state.transactions.transactions);

  const balance = calculateBalance(transactions);
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);

  // Configuration for summary cards - reduces duplication
  const summaryCards = [
    {
      id: 'balance',
      title: 'Total Balance',
      amount: balance,
      variant: 'balance-card',
      amountClass: balance >= 0 ? 'positive' : 'negative',
      prefix: balance >= 0 ? '' : '',
    },
    {
      id: 'income',
      title: 'Income',
      amount: income,
      variant: 'income-card',
      amountClass: 'positive',
      prefix: '+',
    },
    {
      id: 'expenses',
      title: 'Expenses',
      amount: expenses,
      variant: 'expense-card',
      amountClass: 'negative',
      prefix: '-',
    },
  ];

  return (
    <div className="summary-cards-container">
      {summaryCards.map((card) => (
        <div key={card.id} className={`summary-card ${card.variant}`}>
          <div className="card-header">
            <h3 className="card-title">{card.title}</h3>
          </div>
          <div className="card-body">
            <p className={`card-amount ${card.amountClass}`}>
              {card.prefix}${card.amount.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
