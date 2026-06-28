"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function HeroSection() {
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.15",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.15",
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.1",
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-sidebar-bg)",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 720,
          height: 480,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 68%)",
          opacity: 0.07,
        }}
      />

      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          padding: "96px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div ref={badgeRef} style={{ opacity: 0, marginBottom: 32 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "var(--color-sidebar-text)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-success)",
              }}
            />
            Deposit safety guaranteed on every listing
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          style={{
            opacity: 0,
            margin: "0 0 24px",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
          }}
        >
          Your deposit is{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            safe
          </span>
          <br />
          with us.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          style={{
            opacity: 0,
            margin: "0 0 40px",
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--color-sidebar-text)",
            maxWidth: 480,
          }}
        >
          PG owns connects tenants to verified PGs whose owners have signed a
          deposit safety agreement. Browse with trust, move in with confidence.
        </p>

        {/* CTAs — exact match to MERN */}
        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 72,
          }}
        >
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
            Explore PGs
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
          <Link
            href="/#how-it-works"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-sidebar-text)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-sidebar-text)")
            }
          >
            How it works
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Stats — gap 64 exact match */}
        <div
          ref={statsRef}
          style={{
            opacity: 0,
            display: "flex",
            alignItems: "center",
            gap: 64,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { value: "100%", label: "Deposit Protected" },
            { value: "₹0", label: "Tenant Fees" },
            { value: "Verified", label: "Every Listing" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--color-sidebar-text)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
