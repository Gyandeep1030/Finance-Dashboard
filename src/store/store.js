import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    ui: uiReducer,
  },
});

export default store;
