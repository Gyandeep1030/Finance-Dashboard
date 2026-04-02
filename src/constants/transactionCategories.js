/**
 * Transaction Categories and Form Constants
 * 
 * Centralized definitions for transaction categories and field metadata
 * to ensure consistency and reduce duplication across components.
 */

export const TRANSACTION_CATEGORIES = [
  'Salary',
  'Freelance',
  'Bonus',
  'Groceries',
  'Utilities',
  'Entertainment',
  'Transportation',
  'Healthcare',
  'Dining',
  'Shopping',
  'Rent',
];

export const TRANSACTION_TYPES = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
];

export const FORM_FIELD_LABELS = {
  date: 'Date',
  category: 'Category',
  amount: 'Amount',
  type: 'Type',
};
