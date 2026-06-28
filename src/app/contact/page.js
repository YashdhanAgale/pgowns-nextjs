export const metadata = {
  title: "Contact Us | PGOwns",
  description:
    "Get in touch with PGOwns. We are here to help tenants and PG owners with any questions.",
  alternates: { canonical: "https://www.pgowns.in/contact" },
};

export default function ContactPage() {
  return (
    <div style={{ background: "var(--color-background)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "var(--color-sidebar-bg)",
          borderBottom: "1px solid var(--color-border)",
          padding: "60px 16px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "var(--color-sidebar-text)",
              lineHeight: 1.7,
            }}
          >
            Have a question or need help? We are here for you.
          </p>
        </div>
      </div>

      <div
        style={{ maxWidth: 800, margin: "0 auto", padding: "48px 16px 80px" }}
      >
        {/* Contact Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {[
            {
              icon: "📧",
              title: "Email Us",
              value: "support@pgowns.in",
              desc: "We reply within 24 hours",
              href: "mailto:support@pgowns.in",
            },
            {
              icon: "📍",
              title: "Location",
              value: "Pune, Maharashtra",
              desc: "Serving Pune & Navi Mumbai",
              href: null,
            },
            {
              icon: "🕐",
              title: "Working Hours",
              value: "Mon–Sat, 10am–7pm",
              desc: "IST (Indian Standard Time)",
              href: null,
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "24px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 28 }}>{item.icon}</div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {item.title}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    textDecoration: "none",
                  }}
                >
                  {item.value}
                </a>
              ) : (
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {item.value}
                </p>
              )}
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ quick links */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            padding: "32px",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: 18,
              fontWeight: 800,
              color: "var(--color-text-primary)",
            }}
          >
            Common Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "How does the deposit safety guarantee work?",
              "Is PGOwns free for tenants?",
              "How do I list my PG on PGOwns?",
              "What happens after I send an enquiry?",
            ].map((q) => (
              <div
                key={q}
                style={{
                  padding: "14px 16px",
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 10,
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                {q}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-disabled)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ flexShrink: 0 }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            ))}
          </div>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 13,
              color: "var(--color-text-secondary)",
            }}
          >
            Can't find your answer? Email us at{" "}
            <a
              href="mailto:support@pgowns.in"
              style={{
                color: "var(--color-primary)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              support@pgowns.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
