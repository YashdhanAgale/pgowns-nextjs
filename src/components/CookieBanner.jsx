"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const setConsentCookie = () => {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `cookieConsent=accepted; domain=.pgowns.in; path=/; max-age=${oneYear}; SameSite=Lax`;
};

const getConsentCookie = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("cookieConsent="))
    ?.split("=")[1];
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsentCookie();
    if (consent !== "accepted") {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsentCookie();
    setVisible(false);
    window.dispatchEvent(new Event("cookieConsentAccepted"));
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.15)",
        padding: "16px",
        paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
        className="cookie-banner-inner"
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          We use cookies to understand how you use our site and improve your
          experience.{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-primary)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={handleAccept}
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
            flexShrink: 0,
            alignSelf: "flex-end",
            minWidth: 120,
          }}
        >
          Accept
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cookie-banner-inner {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
