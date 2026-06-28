"use client";

import { useState, useCallback, useEffect } from "react";
import PGCard from "@/components/pg/PGCard";
import { MERN_APP_URL } from "@/config";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ExplorePage() {
  const [pgs, setPgs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    genderPreference: "",
    availabilityStatus: "",
    minRent: "",
    maxRent: "",
    page: 1,
  });

  const fetchPGs = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams({ page: filters.page, limit: 12 });
      if (filters.city.trim()) params.append("city", filters.city.trim());
      if (filters.genderPreference)
        params.append("genderPreference", filters.genderPreference);
      if (filters.availabilityStatus)
        params.append("availabilityStatus", filters.availabilityStatus);
      if (filters.minRent) params.append("minRent", filters.minRent);
      if (filters.maxRent) params.append("maxRent", filters.maxRent);

      const res = await fetch(`${API}/pgs?${params}`);
      const data = await res.json();
      setPgs(data.pgs || []);
      setPagination(data.pagination || null);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPGs();
  }, [fetchPGs]);

  const setFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  const setPage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () =>
    setFilters({
      city: "",
      genderPreference: "",
      availabilityStatus: "",
      minRent: "",
      maxRent: "",
      page: 1,
    });

  const hasActiveFilters =
    filters.city ||
    filters.genderPreference ||
    filters.availabilityStatus ||
    filters.minRent ||
    filters.maxRent;

  const btnStyle = (active) => ({
    padding: "8px 14px",
    borderRadius: 8,
    border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
    background: active ? "var(--color-primary)" : "transparent",
    color: active ? "#fff" : "var(--color-text-secondary)",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    fontFamily: "inherit",
    transition: "all 0.15s",
  });

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid var(--color-border)",
    background: "var(--color-surface)",
    color: "var(--color-text-primary)",
    fontSize: 13,
    outline: "none",
    minWidth: 0,
    fontFamily: "inherit",
  };

  return (
    <>
      <div
        style={{ background: "var(--color-background)", minHeight: "100vh" }}
      >
        {/* ── Sticky Filter Bar ── */}
        <div
          style={{
            position: "sticky",
            top: "var(--navbar-height)",
            zIndex: 40,
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            padding: "12px 16px",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            {/* Mobile filters */}
            <div
              className="mobile-filters"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {/* Search */}
              <div style={{ position: "relative" }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search city..."
                  value={filters.city}
                  onChange={(e) => setFilter("city", e.target.value)}
                  style={{ ...inputStyle, width: "100%", paddingLeft: 36 }}
                />
              </div>
              {/* Gender */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  overflowX: "auto",
                  paddingBottom: 2,
                }}
              >
                {[
                  { label: "Any Gender", value: "" },
                  { label: "Males", value: "male" },
                  { label: "Females", value: "female" },
                ].map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setFilter("genderPreference", o.value)}
                    style={btnStyle(filters.genderPreference === o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {/* Availability + Rent */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  overflowX: "auto",
                  paddingBottom: 2,
                }}
              >
                {[
                  { label: "Available", value: "available" },
                  { label: "Full", value: "full" },
                ].map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setFilter("availabilityStatus", o.value)}
                    style={btnStyle(filters.availabilityStatus === o.value)}
                  >
                    {o.label}
                  </button>
                ))}
                <div
                  style={{
                    width: 1,
                    height: 20,
                    background: "var(--color-border)",
                    flexShrink: 0,
                  }}
                />
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={filters.minRent}
                  onChange={(e) => setFilter("minRent", e.target.value)}
                  style={{ ...inputStyle, width: 68, flexShrink: 0 }}
                />
                <span
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  —
                </span>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={filters.maxRent}
                  onChange={(e) => setFilter("maxRent", e.target.value)}
                  style={{ ...inputStyle, width: 68, flexShrink: 0 }}
                />
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    style={{
                      ...btnStyle(false),
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Desktop filters */}
            <div
              className="desktop-filters"
              style={{
                display: "none",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search city..."
                  value={filters.city}
                  onChange={(e) => setFilter("city", e.target.value)}
                  style={{ ...inputStyle, width: "100%", paddingLeft: 36 }}
                />
              </div>
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: "var(--color-border)",
                  flexShrink: 0,
                }}
              />
              {[
                { label: "Any Gender", value: "" },
                { label: "Males", value: "male" },
                { label: "Females", value: "female" },
              ].map((o) => (
                <button
                  key={o.value}
                  onClick={() => setFilter("genderPreference", o.value)}
                  style={btnStyle(filters.genderPreference === o.value)}
                >
                  {o.label}
                </button>
              ))}
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: "var(--color-border)",
                  flexShrink: 0,
                }}
              />
              {[
                { label: "Available", value: "available" },
                { label: "Full", value: "full" },
              ].map((o) => (
                <button
                  key={o.value}
                  onClick={() => setFilter("availabilityStatus", o.value)}
                  style={btnStyle(filters.availabilityStatus === o.value)}
                >
                  {o.label}
                </button>
              ))}
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: "var(--color-border)",
                  flexShrink: 0,
                }}
              />
              <input
                type="number"
                placeholder="Min ₹"
                value={filters.minRent}
                onChange={(e) => setFilter("minRent", e.target.value)}
                style={{ ...inputStyle, width: 80 }}
              />
              <span
                style={{ color: "var(--color-text-secondary)", fontSize: 13 }}
              >
                —
              </span>
              <input
                type="number"
                placeholder="Max ₹"
                value={filters.maxRent}
                onChange={(e) => setFilter("maxRent", e.target.value)}
                style={{ ...inputStyle, width: 80 }}
              />
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  style={{
                    ...btnStyle(false),
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "24px 16px 80px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
              }}
            >
              Explore PGs
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--color-text-secondary)",
              }}
            >
              Browse verified PGs in Pune and Navi Mumbai
            </p>
          </div>

          {/* Result count */}
          {!loading && pagination && (
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 13,
                color: "var(--color-text-secondary)",
              }}
            >
              {pagination.total === 0
                ? "No PGs found"
                : `${pagination.total} PG${pagination.total === 1 ? "" : "s"} found`}
            </p>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                gap: 16,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 14,
                    border: "1px solid var(--color-border)",
                    overflow: "hidden",
                    background: "var(--color-surface)",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16/10",
                      background: "var(--color-background)",
                    }}
                  />
                  <div
                    style={{
                      padding: "16px 18px 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {[60, 40, 30].map((w, j) => (
                      <div
                        key={j}
                        style={{
                          height: 14,
                          borderRadius: 6,
                          background: "var(--color-background)",
                          width: `${w}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: 15,
                  marginBottom: 16,
                }}
              >
                Failed to load PGs. Please try again.
              </p>
              <button
                onClick={fetchPGs}
                style={{
                  padding: "10px 24px",
                  borderRadius: 8,
                  background: "var(--color-primary)",
                  color: "#fff",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && pgs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
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
                No PGs found
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                }}
              >
                Try adjusting your filters
              </p>
            </div>
          )}

          {/* PG Grid */}
          {!loading && !error && pgs.length > 0 && (
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
          )}

          {/* Pagination */}
          {!loading && pagination && pagination.totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                marginTop: 48,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setPage(filters.page - 1)}
                disabled={!pagination.hasPrevPage}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: pagination.hasPrevPage
                    ? "var(--color-text-primary)"
                    : "var(--color-text-disabled)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                }}
              >
                ← Prev
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: `1px solid ${p === filters.page ? "var(--color-primary)" : "var(--color-border)"}`,
                    background:
                      p === filters.page
                        ? "var(--color-primary)"
                        : "transparent",
                    color:
                      p === filters.page ? "#fff" : "var(--color-text-primary)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(filters.page + 1)}
                disabled={!pagination.hasNextPage}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: pagination.hasNextPage
                    ? "var(--color-text-primary)"
                    : "var(--color-text-disabled)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                }}
              >
                Next →
              </button>
            </div>
          )}
          {/* ── Can't find the right PG ── */}
          <div
            style={{
              marginTop: 48,
              padding: "40px 32px",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "var(--color-background)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                Can't find the right PG?
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                  maxWidth: 380,
                  lineHeight: 1.6,
                }}
              >
                Tell us your city, budget and move-in date — we'll find verified
                PGs that match and reach out within 48 hours.
              </p>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 12,
                  color: "var(--color-text-disabled)",
                }}
              >
                🔒 You need to be logged in to submit this request
              </p>
            </div>
            <a
              href={`${MERN_APP_URL}/login`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                borderRadius: 999,
                background: "var(--color-primary)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                transition: "filter 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "brightness(0.9)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              Log in to tell us what you need →
            </a>
          </div>
        </div>

        <style>{`
        @media (min-width: 768px) {
          .mobile-filters { display: none !important; }
          .desktop-filters { display: flex !important; }
        }
      `}</style>
      </div>
    </>
  );
}
