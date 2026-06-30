import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ImageGallery from "@/components/pg/ImageGallery";
import EnquiryButton from "@/components/pg/EnquiryButton";
import TrackPGView from "@/components/analytics/trackPGView";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── Data Fetching ────────────────────────────────────────────────────────────

async function fetchPG(id) {
  try {
    const res = await fetch(`${API}/pgs/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.pg : null;
  } catch {
    return null;
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const pg = await fetchPG(params.id);
  if (!pg) return { title: "PG Not Found | PG owns" };

  const city = pg.location?.city || "India";
  const state = pg.location?.state || "";
  const rent = pg.rent ? `₹${pg.rent.toLocaleString("en-IN")}/mo` : "";
  const gender =
    pg.genderPreference === "male"
      ? "Male"
      : pg.genderPreference === "female"
        ? "Female"
        : "Co-ed";

  const title = `PG in ${city}${state ? `, ${state}` : ""} — ${gender} PG${rent ? ` at ${rent}` : ""} | PG owns`;
  const description = `${gender} PG in ${city}${state ? `, ${state}` : ""}${rent ? ` at ${rent}` : ""}. Verified listing with deposit safety guarantee on PG owns.`;
  const imageUrl =
    pg.images?.[0]?.url || "https://www.pgowns.in/og-default.jpg";

  return {
    title,
    description,
    alternates: { canonical: `https://www.pgowns.in/pg/${params.id}` },
    openGraph: {
      title,
      description,
      url: `https://www.pgowns.in/pg/${params.id}`,
      siteName: "PG owns",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// ─── Structured Data ──────────────────────────────────────────────────────────

function StructuredData({ pg, id }) {
  const city = pg.location?.city || "";
  const state = pg.location?.state || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: `PG in ${city}`,
    description:
      pg.description || `Paying Guest accommodation in ${city}, ${state}`,
    url: `https://www.pgowns.in/pg/${id}`,
    image: pg.images?.map((img) => img.url) || [],
    priceRange: pg.rent
      ? `₹${pg.rent.toLocaleString("en-IN")}/month`
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state,
      addressCountry: "IN",
    },
    amenityFeature: (pg.amenities || []).map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
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
        name: `PG in ${city}`,
        item: `https://www.pgowns.in/pg-in/${city.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "PG Details",
        item: `https://www.pgowns.in/pg/${id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AMENITY_ICONS = {
  WiFi: "📶",
  AC: "❄️",
  Meals: "🍽️",
  Parking: "🅿️",
  Laundry: "👕",
  "Hot Water": "🚿",
  "Power Backup": "🔋",
  CCTV: "📷",
  Gym: "🏋️",
  "Study Room": "📚",
};

const GENDER_LABEL = {
  male: "Males Only",
  female: "Females Only",
  any: "Any gender",
};

const GENDER_COLOR = {
  male: "#3b82f6",
  female: "#ec4899",
  any: "#10b981",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PGDetailPage({ params }) {
  const pg = await fetchPG(params.id);
  if (!pg) notFound();

  const city = pg.location?.city || "India";
  const state = pg.location?.state || "";
  const sharingTypes = pg.sharingType
    ? pg.sharingType.split(",").map((s) => s.trim())
    : [];

  const genderColor = GENDER_COLOR[pg.genderPreference] || GENDER_COLOR.any;
  const genderLabel = GENDER_LABEL[pg.genderPreference] || "Any gender";
  const isFull = pg.availabilityStatus === "full";

  return (
    <>
      <StructuredData pg={pg} id={params.id} />
      <TrackPGView
        pgId={params.id}
        pgName={`PG in ${city}`}
        city={city}
        rent={pg.rent}
      />
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
              <li>
                <Link
                  href={`/pg-in/${city.toLowerCase()}`}
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: 12,
                    textDecoration: "none",
                  }}
                >
                  PG in {city}
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
                PG Details
              </li>
            </ol>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "24px 16px 100px",
          }}
        >
          {/* Image Gallery */}
          <ImageGallery images={pg.images || []} alt={`PG in ${city}`} />

          {/* Grid */}
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 20,
            }}
            className="pg-detail-grid"
          >
            {/* ── Left: Details ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Header Card */}
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 14,
                  padding: "20px",
                }}
              >
                {/* Badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: isFull
                        ? "rgba(248,113,113,0.10)"
                        : "rgba(52,211,153,0.12)",
                      color: isFull ? "#f87171" : "#34d399",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: isFull ? "#f87171" : "#34d399",
                      }}
                    />
                    {isFull ? "Full" : "Available"}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: `${genderColor}18`,
                      color: genderColor,
                      border: `1px solid ${genderColor}30`,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {genderLabel}
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  PG Accommodation in {city}
                  {state && (
                    <span
                      style={{
                        color: "var(--color-text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      , {state}
                    </span>
                  )}
                </h1>

                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                      fontWeight: 800,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    ₹{pg.rent?.toLocaleString("en-IN") || "—"}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--color-text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    /month
                  </span>
                </div>

                {sharingTypes.length > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {sharingTypes.map((s) => (
                      <span
                        key={s}
                        style={{
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: "var(--color-background)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text-secondary)",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {s} Sharing
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Amenities */}
              {pg.amenities?.length > 0 && (
                <div
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 14,
                    padding: "20px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 14px",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Amenities
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(130px, 1fr))",
                      gap: 10,
                    }}
                  >
                    {pg.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 10,
                          background: "var(--color-background)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        <span style={{ fontSize: 16, lineHeight: 1 }}>
                          {AMENITY_ICONS[amenity] || "✓"}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {pg.description && (
                <div
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 14,
                    padding: "20px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 12px",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    About this PG
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {pg.description}
                  </p>
                </div>
              )}

              {/* Rules */}
              {pg.rules?.length > 0 && (
                <div
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 14,
                    padding: "20px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 14px",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    House Rules
                  </h2>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {pg.rules.map((rule, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 14,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            marginTop: 2,
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            background: "var(--color-primary-light)",
                            border: "1px solid var(--color-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-primary)"
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Location */}
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 14,
                  padding: "20px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 12px",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Location
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {city}
                    {state && `, ${state}`}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    padding: "10px 14px",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-text-secondary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Full address shared after your enquiry is confirmed.
                  </span>
                </div>
              </div>

              {/* Deposit Safety */}
              <div
                style={{
                  background: "var(--color-sidebar-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 14,
                  padding: "20px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "var(--color-primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    🛡️
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: "0 0 6px",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Deposit Safety Guarantee
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      Every PG on PG owns is vetted. Your deposit is protected —
                      we only list owners who have signed our safety agreement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related City Link */}
              <div
                style={{
                  paddingTop: 8,
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Looking for more options?
                </p>
                <Link
                  href={`/pg-in/${city.toLowerCase()}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    textDecoration: "none",
                  }}
                >
                  View all PGs in {city}
                  <svg
                    width="13"
                    height="13"
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

            {/* ── Right: Sticky CTA (desktop only) ── */}
            <div className="pg-detail-sidebar">
              <div style={{ position: "sticky", top: 80 }}>
                <div
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background: "var(--color-sidebar-bg)",
                      borderBottom: "1px solid var(--color-border)",
                      padding: "18px 20px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 2px",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--color-primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Interested in this PG?
                    </p>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontSize: 18,
                        fontWeight: 800,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      ₹{pg.rent?.toLocaleString("en-IN")}/month
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {city}
                      {state && `, ${state}`}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <EnquiryButton isFull={isFull} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {[
                        "Free to enquire",
                        "Deposit protected",
                        "Verified listing",
                      ].map((t) => (
                        <div
                          key={t}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 13,
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#34d399"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Sticky CTA ── */}
        <div
          className="pg-detail-bottom-bar"
          style={{
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
            padding: "12px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: "var(--color-text-secondary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                PG in {city}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 800,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.2,
                }}
              >
                ₹{pg.rent?.toLocaleString("en-IN") || "—"}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  /mo
                </span>
              </p>
            </div>
            <EnquiryButton isFull={isFull} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .pg-detail-grid {
            grid-template-columns: 1fr 340px !important;
          }
          .pg-detail-sidebar {
            display: block !important;
          }
          .pg-detail-bottom-bar {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .pg-detail-sidebar {
            display: none !important;
          }
          .pg-detail-bottom-bar {
            display: block !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 40;
          }
        }
      `}</style>
    </>
  );
}
