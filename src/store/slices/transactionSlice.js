import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'finance_transactions';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const saveToLocalStorage = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
      state.error = null;
      saveToLocalStorage(action.payload);
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      saveToLocalStorage(state.transactions);
    },
    updateTransaction: (state, action) => {
      const updatedTransaction = action.payload;
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === updatedTransaction.id
      );

      if (index !== -1) {
        state.transactions[index] = updatedTransaction;
        saveToLocalStorage(state.transactions);
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      saveToLocalStorage(state.transactions);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loadFromStorage: (state, action) => {
      state.transactions = action.payload || [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setLoading,
  setError,
  loadFromStorage,
} = transactionSlice.actions;

export { loadFromLocalStorage };
export default transactionSlice.reducer;
