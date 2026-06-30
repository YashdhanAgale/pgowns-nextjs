"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MERN_APP_URL } from "@/config";

const NAV_LINKS = [
  { label: "Explore PGs", href: "/explore" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          height: "var(--navbar-height)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--content-max-width)",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="PG owns"
              width={32}
              height={32}
              style={{ objectFit: "contain", filter: "invert(1)" }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              owns
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 24 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <a
              href={`${MERN_APP_URL}/login`}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 8,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "filter 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "brightness(0.9)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              Log in
            </a>
            <a
              href={`${MERN_APP_URL}/signup`}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 8,
                background: "var(--color-primary)",
                border: "none",
                cursor: "pointer",
                transition: "filter 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "brightness(0.9)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              Sign up
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="mobile-menu-btn"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              zIndex: 51,
              height: "100%",
              width: 280,
              background: "var(--color-surface)",
              borderLeft: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* Drawer header */}
            <div
              style={{
                height: "var(--navbar-height)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="PGOwns"
                  width={32}
                  height={32}
                  style={{ objectFit: "contain", filter: "invert(1)" }}
                />
                <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>
                  owns
                </span>
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer nav */}
            <nav
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: 16,
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "var(--color-background)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Drawer auth */}
            <div
              style={{
                padding: 16,
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <a
                href={`${MERN_APP_URL}/login`}
                style={{
                  width: "100%",
                  padding: "11px 0",
                  borderRadius: 8,
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Log in
              </a>
              <a
                href={`${MERN_APP_URL}/signup`}
                style={{
                  width: "100%",
                  padding: "11px 0",
                  borderRadius: 999,
                  border: "none",
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Sign up
              </a>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
