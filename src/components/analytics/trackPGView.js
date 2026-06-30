"use client";

import { useEffect } from "react";

export default function TrackPGView({ pgId, pgName, city, rent }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_pg_detail", {
        pg_id: pgId,
        pg_name: pgName,
        city,
        rent,
      });
    }
  }, [pgId, pgName, city, rent]);

  return null;
}
