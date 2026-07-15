"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "@/components/ui/LoginModal";

const GENDER_LABEL = {
  male: "Males only",
  female: "Females only",
  any: "Any gender",
};

const GENDER_COLOR = {
  male: "#3b82f6",
  female: "#ec4899",
  any: "#10b981",
};

export default function PGCard({ pg }) {
  const [showModal, setShowModal] = useState(false);

  const genderColor = GENDER_COLOR[pg.genderPreference] || GENDER_COLOR.any;
  const isFull = pg.availabilityStatus === "full";
  const imageUrl = pg.images?.[0]?.url || null;

  return (
    <>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.25s, border-color 0.25s, transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <Link href={`/pg/${pg._id}`}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              background: "var(--color-background)",
              overflow: "hidden",
            }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`PG in ${pg.location?.city}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>
        </Link>

      {/* Card Body */}
        <Link
          href={`/pg/${pg._id}`}
          style={{
            padding: "16px 18px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flex: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {/* Location + Availability */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "var(--color-text-secondary)",
                fontSize: 13,
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontWeight: 500 }}>
                {pg.location?.area ? `${pg.location.area}, ` : ""}
                {pg.location?.city}, {pg.location?.state}
              </span>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: 999,
                background:
                  pg.availabilityStatus === "available"
                    ? "rgba(52,211,153,0.12)"
                    : "rgba(248,113,113,0.10)",
                color:
                  pg.availabilityStatus === "available" ? "#34d399" : "#f87171",
                whiteSpace: "nowrap",
                letterSpacing: "0.03em",
              }}
            >
              {pg.availabilityStatus === "available" ? "Available" : "Full"}
            </span>
          </div>

          {/* Rent */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              {pg.sharingOptions && pg.sharingOptions.length > 1
                ? `₹${Math.min(...pg.sharingOptions.map((o) => o.rent)).toLocaleString("en-IN")} – ₹${Math.max(...pg.sharingOptions.map((o) => o.rent)).toLocaleString("en-IN")}`
                : `₹${pg.rent?.toLocaleString("en-IN")}`}
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

          {/* Gender + Amenities */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 999,
                background: `${genderColor}18`,
                color: genderColor,
                border: `1px solid ${genderColor}30`,
              }}
            >
              {GENDER_LABEL[pg.genderPreference] || "Any gender"}
            </span>
            {pg.amenities?.slice(0, 3).map((a) => (
              <span
                key={a}
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: "var(--color-background)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {a}
              </span>
            ))}
            {pg.amenities?.length > 3 && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: "var(--color-background)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                +{pg.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Send Enquiry Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isFull) setShowModal(true);
            }}
            disabled={isFull}
            style={{
              marginTop: "auto",
              width: "100%",
              padding: "11px 0",
              borderRadius: 10,
              border: "none",
              background: isFull
                ? "var(--color-border)"
                : "var(--color-primary)",
              color: isFull ? "var(--color-text-secondary)" : "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: isFull ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
              letterSpacing: "0.01em",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (!isFull) e.currentTarget.style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
         >
            {isFull ? "Currently Full" : "Send Enquiry"}
          </button>
        </Link>
      </div>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
