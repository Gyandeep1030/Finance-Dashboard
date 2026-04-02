import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setSort, resetFilters, resetSort } from '../../store/slices/uiSlice';
import '../../styles/filters.css';

/**
 * TransactionFilters Component
 *
 * Provides filtering and sorting controls for the transaction table:
 * - Search by category or date
 * - Filter by transaction type (income/expense)
 * - Sort by date or amount
 * - Sort in ascending or descending order
 * - Reset all filters and sorting
 *
 * All filter and sort state is managed in Redux (ui.filters and ui.sort)
 * so that the state persists while navigating the application.
 */
export default function TransactionFilters() {
  const dispatch = useDispatch();
  const { filters, sort } = useSelector((state) => state.ui);

  /**
   * Update search filter
   * Dispatches to Redux to update the search filter state
   */
  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  /**
   * Update transaction type filter
   * Dispatches to Redux to filter by income or expense
   */
  const handleTypeChange = (e) => {
    dispatch(setFilters({ type: e.target.value }));
  };

  /**
   * Update sort field
   * Dispatches to Redux to change what field to sort by (date or amount)
   */
  const handleSortByChange = (e) => {
    dispatch(setSort({ sortBy: e.target.value }));
  };

  /**
   * Update sort order
   * Dispatches to Redux to change sort direction (ascending or descending)
   */
  const handleSortOrderChange = (e) => {
    dispatch(setSort({ sortOrder: e.target.value }));
  };

  /**
   * Reset all filters and sorting to default values
   * Dispatches two actions to reset both filters and sort state
   */
  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(resetSort());
  };

  /**
   * Determine if any filters or sorting are active
   * Used to conditionally show/hide the Reset button
   * Reset button only appears when non-default filters are applied
   */
  const hasActiveFilters = filters.search || filters.type || sort.sortBy !== 'date' || sort.sortOrder !== 'desc';

  return (
    <div className="filters-container">
      <div className="filters-row">
        <div className="filter-group search-group">
          <label htmlFor="search" className="filter-label">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by category or date..."
            value={filters.search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="type" className="filter-label">Type</label>
          <select
            id="type"
            value={filters.type}
            onChange={handleTypeChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy" className="filter-label">Sort By</label>
          <select
            id="sortBy"
            value={sort.sortBy}
            onChange={handleSortByChange}
            className="filter-select"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortOrder" className="filter-label">Order</label>
          <select
            id="sortOrder"
            value={sort.sortOrder}
            onChange={handleSortOrderChange}
            className="filter-select"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="reset-button"
            title="Reset all filters and sorting"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
