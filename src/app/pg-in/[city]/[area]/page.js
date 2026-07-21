import Link from "next/link";
import PGCard from "@/components/pg/PGCard";
import { notFound } from "next/navigation";
import { SUPPORTED_AREAS, toTitle, isValidArea } from "@/lib/areas";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchAreaPGs(city, area) {
  try {
    const res = await fetch(
      `${API}/pgs?city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}&limit=20`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return { pgs: [], total: 0 };
    const data = await res.json();
    return { pgs: data.pgs || [], total: data.pagination?.total || 0 };
  } catch {
    return { pgs: [], total: 0 };
  }
}

export async function generateMetadata({ params }) {
  const city = decodeURIComponent(params.city);
  const area = decodeURIComponent(params.area);
  const cityName = toTitle(city);
  const areaName = toTitle(area);

  return {
    title: `PG in ${areaName}, ${cityName} — Verified PGs with Deposit Safety | PG owns`,
    description: `Find verified PGs in ${areaName}, ${cityName}. PGs in ${areaName} with deposit safety guarantee, no broker fees, direct owner connect.`,
    alternates: {
      canonical: `https://www.pgowns.in/pg-in/${city}/${area}`,
    },
    openGraph: {
      title: `PG in ${areaName}, ${cityName} | PG owns`,
      description: `Verified PGs in ${areaName}, ${cityName} with deposit safety guarantee.`,
      url: `https://www.pgowns.in/pg-in/${city}/${area}`,
      siteName: "PG owns",
      type: "website",
    },
  };
}

function StructuredData({ city, area, pgs }) {
  const cityName = toTitle(city);
  const areaName = toTitle(area);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `PG in ${areaName}, ${cityName}`,
    description: `Verified paying guest accommodations in ${areaName}, ${cityName}`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: `PG in ${areaName}`,
        item: `https://www.pgowns.in/pg-in/${city}/${area}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How to find a PG in ${areaName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Browse PG owns for verified PGs in ${areaName}, ${cityName}. Every listing is manually verified with a signed deposit safety agreement, and you can filter by gender, budget, and availability.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the PG rent in ${areaName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `PG rent in ${areaName} typically ranges from ₹5,000 to ₹15,000 per month depending on sharing type and amenities.`,
        },
      },
      {
        "@type": "Question",
        name: `Are there PGs for girls and boys in ${areaName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, PG owns lists both male and female PGs in ${areaName}. Use the gender filter on the listing to find the right match.`,
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

export default async function AreaPage({ params }) {
  const city = decodeURIComponent(params.city).toLowerCase();
  const area = decodeURIComponent(params.area).toLowerCase();

  if (!isValidArea(city, area)) notFound();

  const cityName = toTitle(city);
  const areaName = toTitle(area);
  const { pgs, total } = await fetchAreaPGs(city, area);

  if (total === 0) notFound();

  return (
    <>
      <StructuredData city={city} area={area} pgs={pgs} />
      <div
        style={{ background: "var(--color-background)", minHeight: "100vh" }}
      >
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
              <li>
                <Link
                  href={`/pg-in/${city}`}
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: 12,
                    textDecoration: "none",
                  }}
                >
                  PG in {cityName}
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
                PG in {areaName}
              </li>
            </ol>
          </div>
        </div>

        <div
          style={{
            background: "var(--color-sidebar-bg)",
            borderBottom: "1px solid var(--color-border)",
            padding: "40px 16px 36px",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              PG in {areaName}, {cityName}
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
              Verified PGs in {areaName} with deposit safety guarantee. Browse
              PGs in {areaName} with no broker fees — direct owner connect.
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "32px 16px 80px",
          }}
        >
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
              {total} PG{total !== 1 ? "s" : ""} in {areaName}
            </h2>
            <Link
              href={`/pg-in/${city}`}
              style={{
                fontSize: 13,
                color: "var(--color-primary)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              View all PGs in {cityName} →
            </Link>
          </div>
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
              About PGs in {areaName}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
              }}
            >
              {areaName} is one of {cityName}'s most in-demand PG locations,
              known for its proximity to major IT parks and easy connectivity.
              PG owns lists only verified PGs in {areaName}, each with a signed
              deposit safety agreement — so you can book directly with the
              owner, with no broker fees and no deposit disputes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
