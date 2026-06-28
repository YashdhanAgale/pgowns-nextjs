"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "100%",
    label: "Deposit Protected",
    desc: "Every owner signs our safety agreement",
  },
  {
    value: "₹0",
    label: "Tenant Fees",
    desc: "Completely free for tenants forever",
  },
  {
    value: "24hr",
    label: "Response Time",
    desc: "We connect you with owners fast",
  },
  {
    value: "Verified",
    label: "Every Listing",
    desc: "Manually checked before going live",
  },
];

export default function StatsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
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
        padding: "64px 16px",
        background: "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="stat-card"
            style={{
              opacity: 0,
              padding: "24px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "var(--color-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {stat.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
