import "../app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body>
        <main className={`flex min-h-screen flex-col`}>{children}</main>
      </body>
    </html>
  );
}
