import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "PGOwns — Verified PGs with Deposit Safety",
  description:
    "Find verified PGs in Pune and Mumbai with deposit safety guarantee. Browse, enquire, and move in with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ background: "#020617" }}>
      <body style={{ background: "#020617", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1, width: "100%" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
