"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER = "https://placehold.co/800x500/f3f4f6/9ca3af?text=No+Image";

export default function ImageGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const hasImages = images && images.length > 0;

  // Normalize: handles both string[] and {url, publicId}[]
  const imgs = hasImages
    ? images.map((img) => (typeof img === "string" ? img : img.url))
    : [PLACEHOLDER];
  const total = imgs.length;

  function prev() {
    setActive((a) => (a === 0 ? total - 1 : a - 1));
  }
  function next() {
    setActive((a) => (a === total - 1 ? 0 : a + 1));
  }

  return (
    <>
      {/* ── Mobile: single image with arrows ── */}
      <div className="lg:hidden relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 select-none">
        <Image
          src={imgs[active]}
          alt={`${alt} — photo ${active + 1}`}
          fill
          className="object-cover"
          priority={active === 0}
          sizes="100vw"
          onClick={() => setLightbox(true)}
        />

        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === active ? "bg-white w-4" : "bg-white/50 w-1.5"}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
          {active + 1}/{total}
        </div>
      </div>

      {/* ── Desktop: grid layout ── */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px]">
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={imgs[0]}
            alt={`${alt} — main photo`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="50vw"
          />
        </div>

        {/* Remaining 4 thumbnails */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`relative cursor-pointer group overflow-hidden ${!imgs[i] ? "bg-gray-100" : ""}`}
            onClick={() => {
              if (imgs[i]) {
                setActive(i);
                setLightbox(true);
              }
            }}
          >
            {imgs[i] ? (
              <>
                <Image
                  src={imgs[i]}
                  alt={`${alt} — photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
                {i === 4 && total > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      +{total - 4} photos
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imgs[active]}
              alt={`${alt} — photo ${active + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {active + 1} / {total}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
