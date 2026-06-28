"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        width: "100%",
        paddingTop: 96,
        paddingBottom: 96,
        background: "var(--color-background)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
        <div
          ref={ref}
          style={{
            opacity: 0,
            position: "relative",
            overflow: "hidden",
            borderRadius: 20,
            border: "1px solid var(--color-border)",
            background: "var(--color-sidebar-bg)",
            padding: "80px 32px",
            textAlign: "center",
          }}
        >
          {/* Top glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 240,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse at 50% 0%, var(--color-primary) 0%, transparent 65%)",
              opacity: 0.08,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-primary)",
              }}
            >
              Get started today
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                maxWidth: 520,
              }}
            >
              Ready to find your next PG?
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.75,
                color: "var(--color-sidebar-text)",
                maxWidth: 400,
              }}
            >
              Browse verified listings, enquire instantly, and move in with full
              deposit protection. No fees, no stress.
            </p>
            {/* Single button — exact match to MERN */}
            <div style={{ marginTop: 8 }}>
              <Link
                href="/explore"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 8,
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "filter 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter = "brightness(0.9)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              >
                Explore PGs now
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
