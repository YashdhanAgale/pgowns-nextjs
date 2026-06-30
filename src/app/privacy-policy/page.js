export const metadata = {
  title: "Privacy Policy | PG owns",
  description:
    "PG owns privacy policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://www.pgowns.in/privacy-policy" },
};

const SECTIONS = [
  {
    title: "Information We Collect",
    content: `When you use PG owns, we collect information you provide directly to us, such as your name, email address, and phone number when you create an account or send an enquiry. We also collect information about how you use our platform, including pages visited and searches made.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve our services. This includes connecting tenants with PG owners, sending enquiry notifications, and communicating with you about your account. We do not sell your personal information to third parties.`,
  },
  {
    title: "Information Sharing",
    content: `When you send an enquiry, your name and contact information is shared with the PG owner to facilitate the rental process. We do not share your information with advertisers or third-party marketing companies.`,
  },
  {
    title: "Data Security",
    content: `We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. All data is transmitted over HTTPS and stored securely on encrypted servers.`,
  },
  {
    title: "Cookies",
    content: `We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how you use our platform. You can control cookie settings through your browser.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us at pgownsconnect@gmail.com.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us at pgownsconnect@gmail.com.`,
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
