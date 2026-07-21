// Single source of truth for city → area combos.
// To add a new area later: add ONE line here. Nothing else needs to change.

export const SUPPORTED_AREAS = {
  pune: ["baner", "kharadi"],
  "navi-mumbai": ["vashi"],
};

export function toTitle(str) {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function isValidArea(city, area) {
  return SUPPORTED_AREAS[city]?.includes(area) || false;
}
