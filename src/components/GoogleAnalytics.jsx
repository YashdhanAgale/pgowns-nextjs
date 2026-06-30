"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const GA_ID = "G-1YYMYC5TEX";

const getConsentCookie = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("cookieConsent="))
    ?.split("=")[1];
};

const GoogleAnalytics = () => {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      if (getConsentCookie() === "accepted") {
        setConsented(true);
      }
    };
    check();
    window.addEventListener("cookieConsentAccepted", check);
    return () => window.removeEventListener("cookieConsentAccepted", check);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
