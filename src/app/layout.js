import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lokal - lokale råvarer et tastetrykk unna",
  description: "Lokal er en app som lar deg finne lokale råvarer i nærområdet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
