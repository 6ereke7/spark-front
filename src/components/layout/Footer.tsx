import { Link } from "react-router-dom";
import "./footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="brand" to="/" aria-label="Andeluse home">
          <span className="brand__mark" aria-hidden="true">
            &gt;_
          </span>
          <span>andeluse</span>
        </Link>
        <p>Learn security. Practice responsibly.</p>
        <nav aria-label="Footer navigation">
          <Link to="/#courses">Courses</Link>
          <Link to="/awareness">Awareness</Link>
          <Link to="/enroll">Enroll</Link>
        </nav>
        <small>
          © {new Date().getFullYear()} Andeluse. Learn with purpose.
        </small>
      </div>
    </footer>
  );
}
