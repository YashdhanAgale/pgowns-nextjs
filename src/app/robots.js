export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/explore",
          "/pg/",
          "/pg-in/",
          "/about",
          "/contact",
          "/privacy-policy",
          "/terms",
        ],
        disallow: ["/tenant/", "/pgowner/", "/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.pgowns.in/sitemap.xml",
  };
}
