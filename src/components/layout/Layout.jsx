import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/layout.css';

/**
 * Layout Component
 *
 * App shell that provides the overall structure:
 * - Sidebar with navigation
 * - Header with title and controls
 * - Main content area
 */
export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Header />
        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}
