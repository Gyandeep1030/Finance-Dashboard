import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setTransactions,
  setLoading,
  setError,
  loadFromStorage,
  loadFromLocalStorage,
} from '../store/slices/transactionSlice';
import { fetchTransactions } from '../services/api';

/**
 * Custom hook to handle transaction loading with caching strategy
 *
 * Loading Strategy (Performance Optimization):
 * 1. Check localStorage first (instant, no network request)
 * 2. If no cached data, fetch from API
 * 3. Subsequent loads in the session use the cached data
 * 4. User changes (add/delete) update both Redux and localStorage
 *
 * Features:
 * - Optimistic UI: Shows cached data immediately if available
 * - Fallback: Fetches fresh data from API if cache is empty
 * - Error Handling: Gracefully handles fetch failures
 * - State Management: Updates Redux with loading/error states
 *
 * This hook should be called once at the app/page level, typically
 * in the main Dashboard or App component.
 */
export function useTransactionLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTransactions = async () => {
      // Set loading state while fetching
      dispatch(setLoading(true));
      try {
        // Step 1: Try to load from localStorage for instant UI
        const storedData = loadFromLocalStorage();
        if (storedData && storedData.length > 0) {
          // Found cached data - use it immediately
          dispatch(loadFromStorage(storedData));
          return;
        }

        // Step 2: No cached data - fetch from API
        const data = await fetchTransactions();
        dispatch(setTransactions(data));
      } catch (err) {
        // Handle errors - set error message in Redux
        dispatch(setError(err.message || 'Failed to load transactions'));
      }
    };

    loadTransactions();
  }, [dispatch]);
}
