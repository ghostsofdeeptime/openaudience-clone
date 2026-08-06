import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Audience | Audience Engagement Experts",
  description: "Audience engagement strategies, technology and delivery for life sciences, healthcare and complex corporate events.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
