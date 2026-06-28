"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    step: "01",
    title: "Browse Verified PGs",
    description:
      "Explore PGs listed exclusively by owners who have signed our deposit safety agreement. Every listing is manually verified before going live.",
  },
  {
    step: "02",
    title: "Enquire Instantly",
    description:
      "Send an enquiry in one click. We connect you directly with the PG owner — no middlemen, no spam calls, no broker fees.",
  },
  {
    step: "03",
    title: "Move in with Confidence",
    description:
      "Your deposit is protected by our agreement. Move in knowing your money is safe and the terms are crystal clear.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".how-step",
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
      id="how-it-works"
      style={{
        width: "100%",
        paddingTop: 96,
        paddingBottom: 96,
        background: "var(--color-background)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            How it works
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Three steps to your next home
          </h2>
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: 440,
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
            }}
          >
            From browsing to moving in — the whole process is simple,
            transparent, and built around you.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="how-step"
              style={{
                opacity: 0,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                padding: "32px 28px",
                borderRadius: 16,
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                transition: "border-color 0.25s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-border)")
              }
            >
              <span
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid var(--color-primary)",
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {item.step}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
