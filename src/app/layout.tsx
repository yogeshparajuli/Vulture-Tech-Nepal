import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import AuthSessionProvider from "@/components/auth/SessionProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vulture Tech Nepal | CCTV, Storage & Surveillance Equipment",
  description:
    "Vulture Tech Nepal is your trusted source for CCTV cameras, memory cards, monitors, hard disks and surveillance accessories — genuine equipment, expert installation support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-cream">
        <AuthSessionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
