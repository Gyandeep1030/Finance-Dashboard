import { useSelector } from 'react-redux';
import '../../styles/layout.css';

/**
 * Header Component
 *
 * Displays:
 * - App title
 * - User name (for both admin and viewer roles)
 */
export default function Header() {
  const userName = useSelector((state) => state.ui.user.name);

  return (
    <header className="header">
      <h1 className="header__title">Finance Dashboard</h1>
      <div className="header__user-info">
        Welcome, <span className="header__user-name">{userName}</span>
      </div>
    </header>
  );
}
