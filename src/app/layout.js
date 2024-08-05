import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sync Chat",
  description: "Sync Chat App for Members",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={inter.className}>
        <main className={`flex min-h-screen flex-col ${inter.className}`}>
          <Header className="fixed md:static z-10" />
          <div className="md:top-0 relative top-24">
            <div className="flex flex-1 justify-center w-full">
              <div className="flex w-full h-full">{children}</div>
            </div>
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
