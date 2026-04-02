import { createSlice } from '@reduxjs/toolkit';

// Get theme from localStorage or use system preference
const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem('finance_theme');
    if (stored) return stored;
  } catch (e) {
    console.error('Error reading theme from localStorage:', e);
  }
  return 'light';
};

const initialState = {
  role: 'admin',
  theme: getInitialTheme(),
  filters: {
    search: '',
    type: '',
  },
  sort: {
    sortBy: 'date',
    sortOrder: 'desc',
  },
  user: {
    id: 1,
    name: 'Gyandeep Kumar',
    email: 'gyandeep1030@gmail.com',
    bio: 'Finance enthusiast and business analyst',
    image: 'https://ui-avatars.com/api/?name=Gyandeep+Kumar&background=0D8ABC&color=fff', // Updated avatar URL
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      try {
        localStorage.setItem('finance_theme', action.payload);
      } catch (e) {
        console.error('Error saving theme to localStorage:', e);
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('finance_theme', state.theme);
      } catch (e) {
        console.error('Error saving theme to localStorage:', e);
      }
    },
    setUserName: (state, action) => {
      state.user.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.user.email = action.payload;
    },
    setUserBio: (state, action) => {
      state.user.bio = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setSort: (state, action) => {
      state.sort = {
        ...state.sort,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        type: '',
      };
    },
    resetSort: (state) => {
      state.sort = {
        sortBy: 'date',
        sortOrder: 'desc',
      };
    },
  },
});

export const { setRole, setTheme, toggleTheme, setUserName, setUserEmail, setUserBio, setFilters, setSort, resetFilters, resetSort } = uiSlice.actions;

export default uiSlice.reducer;
