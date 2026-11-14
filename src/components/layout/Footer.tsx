import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="brand" to="/" aria-label="spark security home">
          <span className="brand__mark" aria-hidden="true">
            &gt;_
          </span>
          <span>spark security</span>
        </Link>
        <p>Learn security. Practice responsibly.</p>
        <nav aria-label="Footer navigation">
          <Link to="/#courses">Courses</Link>
          <Link to="/awareness">Awareness</Link>
          <Link to="/enroll">Enroll</Link>
        </nav>
        <small>
          © {new Date().getFullYear()} spark security. Learn with purpose.
        </small>
      </div>
    </footer>
  );
}
