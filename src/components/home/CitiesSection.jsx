"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CITIES = [
  {
    name: "Pune",
    slug: "pune",
    areas: "Kharadi · Baner",
    emoji: "🏙️",
  },
  {
    name: "Navi Mumbai",
    slug: "navi-mumbai",
    areas: "Vashi · Kharghar · Belapur · Nerul",
    emoji: "🌆",
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    areas: "Andheri · Thane · Powai · Goregaon",
    emoji: "🏢",
  },
];

export default function CitiesSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".city-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        width: "100%",
        padding: "80px 16px",
        background: "var(--color-sidebar-bg)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-primary)",
              marginBottom: 12,
            }}
          >
            Browse by City
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Find PGs near you
          </h2>
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: 440,
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--color-sidebar-text)",
            }}
          >
            Verified PGs across major cities in Maharashtra with deposit safety
            guarantee.
          </p>
        </div>

        {/* City Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 16,
          }}
        >
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/pg-in/${city.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="city-card"
                style={{
                  opacity: 0,
                  padding: "28px 24px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  transition:
                    "background 0.25s, border-color 0.25s, transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>
                  {city.emoji}
                </div>
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  PG in {city.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontSize: 13,
                    color: "var(--color-sidebar-text)",
                    lineHeight: 1.5,
                  }}
                >
                  {city.areas}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--color-primary)",
                  }}
                >
                  View PGs
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
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
