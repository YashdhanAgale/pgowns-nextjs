import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max-width)",
          margin: "0 auto",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="footer-inner"
      >
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} PG owns. All rights reserved.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link
            href="/privacy-policy"
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              textDecoration: "none",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              textDecoration: "none",
            }}
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              textDecoration: "none",
            }}
          >
            Contact
          </Link>
          <Link
            href="/about"
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              textDecoration: "none",
            }}
          >
            About
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-inner {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
}
