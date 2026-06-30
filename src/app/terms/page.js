export const metadata = {
  title: "Terms of Service | PG owns",
  description:
    "PG owns terms of service — the rules and guidelines for using our platform.",
  alternates: { canonical: "https://www.pgowns.in/terms" },
};

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using PG owns, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.`,
  },
  {
    title: "Use of Platform",
    content: `PG owns is a platform that connects tenants with PG owners. Tenants may browse listings and send enquiries for free. PG owners may list their properties after agreeing to our deposit safety agreement. You agree not to misuse our platform or use it for any unlawful purpose.`,
  },
  {
    title: "Deposit Safety Agreement",
    content: `Every PG owner listed on PG owns has signed our deposit safety agreement. This agreement requires owners to return deposits fairly and transparently. While we facilitate this agreement, PG owns is not directly liable for disputes between tenants and owners. We will, however, assist in mediation where possible.`,
  },
  {
    title: "Listings and Accuracy",
    content: `PG owners are responsible for ensuring their listings are accurate, up to date, and not misleading. PG owns manually verifies listings before they go live but cannot guarantee complete accuracy of all information. Tenants are advised to verify details directly with owners before making any payments.`,
  },
  {
    title: "Prohibited Activities",
    content: `You may not use PG owns to post false or misleading listings, harass other users, attempt to bypass our verification process, or engage in any fraudulent activity. We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "Limitation of Liability",
    content: `PG owns is a facilitating platform and is not a party to any rental agreement between tenants and PG owners. We are not liable for any disputes, damages, or losses arising from rental agreements made through our platform.`,
  },
  {
    title: "Changes to Terms",
    content: `We may update these terms from time to time. Continued use of PG owns after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.`,
  },
  {
    title: "Contact",
    content: `If you have questions about these terms, contact us at pgownsconnect@gmail.com.`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "var(--color-background)", minHeight: "100vh" }}>
      <div
        style={{
          background: "var(--color-sidebar-bg)",
          borderBottom: "1px solid var(--color-border)",
          padding: "48px 16px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Terms of Service
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "var(--color-sidebar-text)",
            }}
          >
            Last updated: June 2025
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "40px 16px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 14,
              padding: "24px",
            }}
          >
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: 16,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
              }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
