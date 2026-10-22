import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LiveFatt TN',
  description: 'Tunisian Live Streaming Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
