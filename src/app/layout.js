import "../app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body>
        <div className={`flex flex-col`}>{children}</div>
      </body>
    </html>
  );
}
