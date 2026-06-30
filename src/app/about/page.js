import Link from "next/link";

export const metadata = {
  title: "About Us | PG owns",
  description:
    "PG owns connects tenants to verified PGs with deposit safety guarantee. Learn about our mission to make PG renting safe and transparent.",
  alternates: { canonical: "https://www.pgowns.in/about" },
};

export default function AboutPage() {
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
            About PG owns
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "var(--color-sidebar-text)",
              lineHeight: 1.7,
            }}
          >
            We are building the most trusted PG rental platform in India — where
            every tenant's deposit is safe and every listing is verified.
          </p>
        </div>
      </div>

      <div
        style={{ maxWidth: 800, margin: "0 auto", padding: "48px 16px 80px" }}
      >
        {/* Mission */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            padding: "32px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: 20,
              fontWeight: 800,
              color: "var(--color-text-primary)",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.8,
            }}
          >
            Finding a PG in India is broken. Tenants deal with fake listings,
            hidden charges, and unfair deposit deductions every day. PG owners
            struggle to find reliable tenants. PG owns fixes this.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.8,
            }}
          >
            We connect tenants directly with verified PG owners who have signed
            our deposit safety agreement. Every listing on PG owns is manually
            verified before it goes live. Tenants browse and enquire for free —
            no broker fees, no commissions, no surprises.
          </p>
        </div>

        {/* How we work */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            padding: "32px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: 20,
              fontWeight: 800,
              color: "var(--color-text-primary)",
            }}
          >
            How it works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                step: "01",
                title: "Browse Verified PGs",
                desc: "Explore PGs listed exclusively by owners who have signed our deposit safety agreement. Every listing is manually verified before going live.",
              },
              {
                step: "02",
                title: "Enquire Instantly",
                desc: "Send an enquiry in one click. We connect you directly with the PG owner — no middlemen, no spam calls, no broker fees.",
              },
              {
                step: "03",
                title: "Move in with Confidence",
                desc: "Your deposit is protected by our agreement. Move in knowing your money is safe and the terms are crystal clear.",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: "var(--color-primary-light)",
                    border: "1px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {item.step}
                </span>
                <div>
                  <h3
                    style={{
                      margin: "0 0 6px",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            padding: "32px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: 20,
              fontWeight: 800,
              color: "var(--color-text-primary)",
            }}
          >
            Our Values
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                icon: "🛡️",
                title: "Deposit Safety First",
                desc: "Every owner signs our agreement. Your deposit is protected.",
              },
              {
                icon: "✅",
                title: "Verified Only",
                desc: "No fake listings. Every PG is manually checked before it goes live.",
              },
              {
                icon: "💬",
                title: "Direct Connect",
                desc: "No middlemen. You talk directly to the owner.",
              },
              {
                icon: "❤️",
                title: "Tenant First",
                desc: "Everything we build starts with what is best for the tenant.",
              },
            ].map((v) => (
              <div
                key={v.title}
                style={{
                  padding: "20px",
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 10 }}>{v.icon}</div>
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            background: "var(--color-sidebar-bg)",
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            padding: "32px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Ready to find your next PG?
          </h2>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 14,
              color: "var(--color-sidebar-text)",
            }}
          >
            Browse verified PGs with deposit safety guarantee. Free for tenants.
          </p>
          <Link
            href="/explore"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 10,
              background: "var(--color-primary)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Explore PGs
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
