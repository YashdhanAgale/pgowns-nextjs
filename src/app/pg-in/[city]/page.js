import Link from "next/link";
import PGCard from "@/components/pg/PGCard";
import { notFound } from "next/navigation";
import { SUPPORTED_AREAS, toTitle } from "@/lib/areas";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const SUPPORTED_CITIES = ["pune", "mumbai", "navi-mumbai"];

// ─── Data Fetching ────────────────────────────────────────────────────────────

async function fetchCityPGs(city) {
  try {
    const res = await fetch(
      `${API}/pgs?city=${encodeURIComponent(city)}&limit=20`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return { pgs: [], total: 0 };
    const data = await res.json();
    return { pgs: data.pgs || [], total: data.pagination?.total || 0 };
  } catch {
    return { pgs: [], total: 0 };
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const city = decodeURIComponent(params.city);
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `PG in ${cityName} — Verified PGs with Deposit Safety | PG owns`,
    description: `Find verified PGs in ${cityName} with deposit safety guarantee. Browse affordable paying guest accommodations in ${cityName}. No broker fees for tenants.`,
    alternates: { canonical: `https://www.pgowns.in/pg-in/${city}` },
    openGraph: {
      title: `PG in ${cityName} | PG owns`,
      description: `Verified PGs in ${cityName} with deposit safety guarantee.`,
      url: `https://www.pgowns.in/pg-in/${city}`,
      siteName: "PG owns",
      type: "website",
    },
  };
}

// ─── Structured Data ──────────────────────────────────────────────────────────

function StructuredData({ city, pgs }) {
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `PG in ${cityName}`,
    description: `Verified paying guest accommodations in ${cityName}`,
    numberOfItems: pgs.length,
    itemListElement: pgs.map((pg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.pgowns.in/pg/${pg._id}`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.pgowns.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `PG in ${cityName}`,
        item: `https://www.pgowns.in/pg-in/${city}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How to find a good PG in ${cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use PG owns to browse verified PGs in ${cityName}. Every listing is manually verified and the owner has signed a deposit safety agreement. You can filter by gender, budget, and availability.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the average PG rent in ${cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `PG rent in ${cityName} varies by location and amenities. Single occupancy typically ranges from ₹5,000 to ₹15,000 per month. Double sharing is usually more affordable.`,
        },
      },
      {
        "@type": "Question",
        name: `Is deposit safe when booking a PG in ${cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `On PG owns, every PG owner signs a deposit safety agreement before listing. This means your deposit is legally protected and must be returned fairly at the end of your stay.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

function getFAQs(cityName) {
  return [
    {
      q: `How to find a good PG in ${cityName}?`,
      a: `Browse PG owns for verified PGs in ${cityName}. Every listing is manually verified and owners have signed a deposit safety agreement. Filter by gender, budget, and availability to find the perfect match.`,
    },
    {
      q: `What is the average PG rent in ${cityName}?`,
      a: `PG rent in ${cityName} varies by location and amenities. Single occupancy typically ranges from ₹5,000 to ₹15,000/month. Double and triple sharing options are more affordable.`,
    },
    {
      q: `Is my deposit safe when booking a PG in ${cityName}?`,
      a: `Yes — on PG owns, every PG owner signs a deposit safety agreement before listing. Your deposit is legally protected and must be returned fairly at the end of your stay.`,
    },
    {
      q: `Are there any broker fees for tenants in ${cityName}?`,
      a: `PG owns is completely free for tenants. Browse, enquire, and move in without paying any platform fees or broker commissions.`,
    },
    {
      q: `What amenities do PGs in ${cityName} offer?`,
      a: `PGs in ${cityName} listed on PG owns offer amenities like WiFi, AC, meals, hot water, laundry, power backup, CCTV, parking, and more. Each listing clearly mentions available amenities.`,
    },
  ];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CityPage({ params }) {
  const city = decodeURIComponent(params.city);
  if (!SUPPORTED_CITIES.includes(city.toLowerCase())) notFound();
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const { pgs, total } = await fetchCityPGs(city);
  const faqs = getFAQs(cityName);

  return (
    <>
      <StructuredData city={city} pgs={pgs} />

      <div
        style={{ background: "var(--color-background)", minHeight: "100vh" }}
      >
        {/* ── Breadcrumb ── */}
        <div
          style={{
            borderBottom: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div
            style={{ maxWidth: 1120, margin: "0 auto", padding: "10px 16px" }}
          >
            <ol
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link
                  href="/"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: 12,
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>
              </li>
              <li style={{ color: "var(--color-text-disabled)", fontSize: 12 }}>
                ›
              </li>
              <li
                style={{
                  color: "var(--color-text-primary)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                PG in {cityName}
              </li>
            </ol>
          </div>
        </div>

        {/* ── Hero ── */}
        <div
          style={{
            background: "var(--color-sidebar-bg)",
            borderBottom: "1px solid var(--color-border)",
            padding: "40px 16px 36px",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 999,
                background: "var(--color-primary-light)",
                border: "1px solid var(--color-primary)",
                color: "var(--color-primary)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              🏠 Verified Listings
            </div>
            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              PG in {cityName}
            </h1>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 15,
                color: "var(--color-sidebar-text)",
                lineHeight: 1.6,
                maxWidth: 520,
              }}
            >
              Find verified paying guest accommodations in {cityName} with
              deposit safety guarantee. No broker fees, direct owner connect.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {[
                { value: total > 0 ? `${total}+` : "—", label: "Listings" },
                { value: "100%", label: "Verified" },
                { value: "₹0", label: "Tenant Fees" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span
                    style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--color-sidebar-text)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "32px 16px 80px",
          }}
        >
          {/* ── PG Grid ── */}
          {pgs.length > 0 ? (
            <>
              <div
                style={{
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {total} PG{total !== 1 ? "s" : ""} in {cityName}
                </h2>
                <Link
                  href="/explore"
                  style={{
                    fontSize: 13,
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  View all cities →
                </Link>
              </div>
              {SUPPORTED_AREAS[city.toLowerCase()] && (
                <div
                  style={{
                    marginBottom: 20,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {SUPPORTED_AREAS[city.toLowerCase()].map((area) => (
                    <Link
                      key={area}
                      href={`/pg-in/${city.toLowerCase()}/${area}`}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 999,
                        border: "1px solid var(--color-border)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        textDecoration: "none",
                      }}
                    >
                      PG in {toTitle(area)}
                    </Link>
                  ))}
                </div>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                  gap: 16,
                }}
              >
                {pgs.map((pg) => (
                  <PGCard key={pg._id} pg={pg} />
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                No PGs listed in {cityName} yet
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                }}
              >
                Check back soon or browse all cities
              </p>
              <Link
                href="/explore"
                style={{
                  marginTop: 8,
                  padding: "10px 24px",
                  borderRadius: 8,
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Browse All PGs
              </Link>
            </div>
          )}

          {/* ── About Section ── */}
          <div
            style={{
              marginTop: 64,
              padding: "32px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
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
              About PGs in {cityName}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                Finding a reliable PG in {cityName} can be challenging — from
                fake listings to unfair deposit deductions. PG owns solves this
                by listing only verified PGs whose owners have signed a deposit
                safety agreement.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                Every PG in {cityName} on our platform is manually verified
                before going live. You can browse by gender preference, budget,
                and availability. Enquiries go directly to the owner — no
                middlemen, no broker fees for tenants.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                Whether you are a student, working professional, or someone new
                to {cityName}, PG owns helps you find a safe and comfortable
                home away from home.
              </p>
            </div>
          </div>

          {/* ── Why PGOwns ── */}
          <div style={{ marginTop: 32 }}>
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: 20,
                fontWeight: 800,
                color: "var(--color-text-primary)",
              }}
            >
              Why choose PG owns in {cityName}?
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                gap: 16,
              }}
            >
              {[
                {
                  icon: "🛡️",
                  title: "Deposit Safety",
                  desc: `Every PG owner in ${cityName} signs our deposit safety agreement. Your money is protected.`,
                },
                {
                  icon: "✅",
                  title: "Verified Listings",
                  desc: `All PGs in ${cityName} are manually verified before listing. No fake listings, no surprises.`,
                },
                {
                  icon: "💬",
                  title: "Direct Connect",
                  desc: "Your enquiry goes straight to the owner. No broker, no commission, no spam calls.",
                },
                {
                  icon: "₹",
                  title: "Free for Tenants",
                  desc: "PG owns is 100% free for tenants. Browse and enquire without paying any platform fee.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: "24px",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 14,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 8px",
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
                      fontSize: 13,
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div style={{ marginTop: 64 }}>
            <h2
              style={{
                margin: "0 0 24px",
                fontSize: 20,
                fontWeight: 800,
                color: "var(--color-text-primary)",
              }}
            >
              Frequently Asked Questions — PG in {cityName}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <summary
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                      listStyle: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    {faq.q}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-text-secondary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ flexShrink: 0 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div
                    style={{
                      padding: "0 20px 16px",
                      fontSize: 14,
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            style={{
              marginTop: 64,
              padding: "40px 32px",
              background: "var(--color-sidebar-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              Ready to find your PG in {cityName}?
            </h2>
            <p
              style={{
                margin: "0 0 24px",
                fontSize: 14,
                color: "var(--color-sidebar-text)",
                lineHeight: 1.6,
              }}
            >
              Browse verified listings, enquire instantly, and move in with full
              deposit protection.
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
              Browse All PGs
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
    </>
  );
}
