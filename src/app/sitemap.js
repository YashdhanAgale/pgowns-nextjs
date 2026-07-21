const BASE_URL = "https://www.pgowns.in";
const API = "https://api.pgowns.in/api";

export default async function sitemap() {
  // ── Static pages ──
  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/explore`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${BASE_URL}/privacy-policy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    { url: `${BASE_URL}/terms`, changeFrequency: "monthly", priority: 0.3 },
  ];

  // ── Fetch all PGs ──
  let pgPages = [];
  let cityPages = [];
  let areaPages = [];

  try {
    const res = await fetch(`${API}/pgs?limit=100`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const pgs = data.pgs || [];

    // PG detail pages
    pgPages = pgs.map((pg) => ({
      url: `${BASE_URL}/pg/${pg._id}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: pg.updatedAt || new Date().toISOString(),
    }));

    // Unique city pages
    const cities = [
      ...new Set(
        pgs
          .map((pg) =>
            pg.location?.city?.toLowerCase().trim().replace(/\s+/g, "-"),
          )
          .filter(Boolean),
      ),
    ];

    cityPages = cities.map((city) => ({
      url: `${BASE_URL}/pg-in/${city}`,
      changeFrequency: "daily",
      priority: 0.9,
    }));

    const areaCombos = [
      ...new Set(
        pgs
          .filter((pg) => pg.location?.area?.trim())
          .map((pg) => {
            const c = pg.location.city
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-");
            const a = pg.location.area
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-");
            return `${c}|${a}`;
          }),
      ),
    ];
    areaPages = areaCombos.map((combo) => {
      const [city, area] = combo.split("|");
      return {
        url: `${BASE_URL}/pg-in/${city}/${area}`,
        changeFrequency: "daily",
        priority: 0.85,
      };
    });
  } catch {
    // If API fails, sitemap still works with static pages
  }

  return [...staticPages, ...cityPages, ...areaPages, ...pgPages];
}
