/**
 * Export transactions to CSV format
 *
 * Features:
 * - Converts transaction array to CSV format
 * - Includes headers: Date, Category, Amount, Type
 * - Properly escapes values containing commas or quotes
 * - Triggers browser download with timestamp
 *
 * @param {Array} transactions - Array of transaction objects
 * @param {string} filename - Optional filename (default: finance_transactions_YYYY-MM-DD.csv)
 */
export const exportToCSV = (transactions, filename = null) => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  // Define CSV headers
  const headers = ['Date', 'Category', 'Amount', 'Type'];

  // Escape CSV values - wrap in quotes if contains comma or quote
  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Convert header row
  const headerRow = headers.map(escapeCSVValue).join(',');

  // Convert transaction rows
  const dataRows = transactions.map((transaction) =>
    [
      transaction.date,
      transaction.category,
      transaction.amount.toFixed(2),
      transaction.type,
    ]
      .map(escapeCSVValue)
      .join(',')
  );

  // Combine all rows
  const csvContent = [headerRow, ...dataRows].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  // Generate filename with current date if not provided
  const downloadFilename =
    filename ||
    `finance_transactions_${new Date().toISOString().split('T')[0]}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', downloadFilename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export transactions to JSON format
 *
 * Features:
 * - Exports full transaction data with all properties
 * - Pretty-printed JSON for readability
 * - Triggers browser download with timestamp
 *
 * @param {Array} transactions - Array of transaction objects
 * @param {string} filename - Optional filename (default: finance_transactions_YYYY-MM-DD.json)
 */
export const exportToJSON = (transactions, filename = null) => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  // Generate filename with current date if not provided
  const downloadFilename =
    filename ||
    `finance_transactions_${new Date().toISOString().split('T')[0]}.json`;

  link.setAttribute('href', url);
  link.setAttribute('download', downloadFilename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
