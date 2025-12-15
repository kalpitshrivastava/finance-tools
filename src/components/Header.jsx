import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const navLink = (path) => ({
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    color: pathname === path ? "#2563eb" : "#334155",
    borderBottom: pathname === path ? "2px solid #2563eb" : "none",
    paddingBottom: 4
  });

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div style={styles.logo}>FinanceTools</div>

        <nav style={styles.nav}>
          <Link to="/" style={navLink("/")}>Home</Link>
          <Link to="/about" style={navLink("/about")}>About</Link>
          <Link to="/contact" style={navLink("/contact")}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0"
  },
  inner: {
    maxWidth: 1100,
    margin: "auto",
    padding: "12px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontSize: 18,
    fontWeight: 600,
    color: "#0f172a"
  },
  nav: {
    display: "flex",
    gap: 20
  }
};
