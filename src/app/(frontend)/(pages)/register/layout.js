import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata = {
  title: "Sign Up on Sync",
  description: "Account Registration on Sync",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-red-950`}>{children}</body>
    </html>
  );
}
