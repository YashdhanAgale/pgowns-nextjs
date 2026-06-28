"use client";

import { MERN_APP_URL } from "@/config";

export default function LoginModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 400,
          background: "var(--color-surface)",
          borderRadius: 16,
          border: "1px solid var(--color-border)",
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--color-primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            Login required
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            You need to be logged in to send an enquiry. It only takes a minute
            to sign up.
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: 12,
            marginTop: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "11px 0",
              borderRadius: 10,
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-text-primary)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border-dark)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border)")
            }
          >
            Close
          </button>
          <a
            href={`${MERN_APP_URL}/login`}
            style={{
              flex: 1,
              padding: "11px 0",
              borderRadius: 10,
              border: "none",
              background: "var(--color-primary)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--color-primary-dark)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--color-primary)")
            }
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
