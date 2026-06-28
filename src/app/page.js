import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CitiesSection from "@/components/home/CitiesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export const metadata = {
  title: "PG in Pune & Navi Mumbai | Verified PGs with Deposit Safety — PGOwns",
  description:
    "Find verified PGs in Pune and Navi Mumbai with deposit safety guaranteed. Browse PGs in Hinjawadi, Kharadi, Vashi and more. Free for tenants, no broker fees.",
  alternates: { canonical: "https://www.pgowns.in" },
  openGraph: {
    title: "PG in Pune & Navi Mumbai | Verified PGs — PGOwns",
    description:
      "Find verified PGs with deposit safety guarantee. No broker fees for tenants.",
    url: "https://www.pgowns.in",
    siteName: "PGOwns",
    type: "website",
  },
};

export default function Home() {
  return (
    <main style={{ background: "var(--color-sidebar-bg)" }}>
      <HeroSection />
      <StatsSection />
      <CitiesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
