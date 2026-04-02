import transactionsData from '../data/transactions.json';

/**
 * Fetch transactions from local data
 * 
 * Imports JSON directly instead of using fetch() for better reliability
 * in production builds. This ensures the data is bundled and available
 * regardless of the build output structure.
 * 
 * @returns {Promise<Array>} Promise resolving to array of transaction objects
 */
export const fetchTransactions = async () => {
  try {
    // Return data as a promise to maintain consistent async interface
    return Promise.resolve(transactionsData);
  } catch (error) {
    console.error('Error loading transactions:', error);
    throw error;
  }
};
