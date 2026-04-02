import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, toggleTheme } from '../../store/slices/uiSlice';
import logoDark from '../../assets/zorvynfulllogodark.png';
import logoLight from '../../assets/zorvynfulllogolight.png';
import '../../styles/layout.css';

/**
 * Sidebar Component
 *
 * Navigation sidebar with links to main sections.
 * Uses React Router NavLink for client-side navigation.
 * Includes theme toggle and role selector at the bottom.
 */
export default function Sidebar() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.ui.role);
  const theme = useSelector((state) => state.ui.theme);

  const handleRoleChange = (e) => {
    dispatch(setRole(e.target.value));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img
          src={theme === 'dark' ? logoLight : logoDark}
          alt="Company logo"
          className={theme === 'dark' ? 'sidebar__logo-light' : 'sidebar__logo-dark'}
        />
      </div>
      <nav className="sidebar__nav">
        <NavLink
          to="/"
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Transactions
        </NavLink>
        <NavLink
          to="/insights"
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Insights
        </NavLink>
        {role === 'admin' && (
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
          >
            Settings
          </NavLink>
        )}
      </nav>
      <div className="sidebar__footer">
        <button
          className="sidebar__theme-toggle"
          onClick={handleThemeToggle}
          aria-label="Toggle dark mode"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <select
          className="sidebar__role-select"
          value={role}
          onChange={handleRoleChange}
          aria-label="User role selector"
        >
          <option value="viewer">👁️ Viewer</option>
          <option value="admin">🔒 Admin</option>
        </select>
      </div>
    </aside>
  );
}
