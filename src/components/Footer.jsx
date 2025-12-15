export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div>© 2025 FinanceTools</div>
      <div>Built for smart financial planning</div>
    </footer>
  );
}

const styles = {
  footer: {
    maxWidth: 1100,
    margin: "40px auto 10px",
    padding: "14px 18px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#64748b"
  }
};
