"use client";

import { useState } from "react";
import LoginModal from "@/components/ui/LoginModal";

export default function EnquiryButton({ isFull }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => !isFull && setShowModal(true)}
        disabled={isFull}
        style={{
          width: "100%",
          padding: "12px 0",
          borderRadius: 10,
          border: "none",
          background: isFull ? "var(--color-border)" : "var(--color-primary)",
          color: isFull ? "var(--color-text-secondary)" : "#fff",
          fontSize: 14,
          fontWeight: 700,
          cursor: isFull ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "opacity 0.2s",
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
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
