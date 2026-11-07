import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          className="brand"
          to="/"
          aria-label="Andeluse home"
          onClick={closeMenu}
        >
          <span className="brand__mark" aria-hidden="true">
            &gt;_
          </span>
          <span>andeluse</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`primary-nav${menuOpen ? " primary-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <Link to="/#courses" onClick={closeMenu}>
            Courses
          </Link>
          <Link to="/awareness" onClick={closeMenu}>
            Awareness
          </Link>
          <Link to="/enroll" onClick={closeMenu}>
            Enroll
          </Link>
        </nav>
      </div>
    </header>
  );
}
