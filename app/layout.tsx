export const metadata = {
  title: "Dina Holdings LLC — Web Development & Custom Web Apps",
  description: "Web development agency building high-performance websites and custom apps. Core Web Vitals, accessibility, security, and measurable results.",
  metadataBase: new URL("https://www.dinaholdingsllc.net"),
  openGraph: {
    title: "Dina Holdings LLC — Web Development & Custom Web Apps",
    description: "High-speed websites and secure, scalable web applications.",
    url: "https://www.dinaholdingsllc.net",
    siteName: "Dina Holdings LLC",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dina Holdings LLC — Web Development & Custom Web Apps",
    description: "High-speed websites and secure, scalable web applications.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "https://www.dinaholdingsllc.net"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
