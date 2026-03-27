import './globals.css';

export const metadata = {
  title: 'Creatorstick Media — Coming Soon',
  description: 'Creatorstick Media is a next-generation media agency in the making. Something bold is launching soon. Stay tuned.',
  keywords: 'media agency, coming soon, creatorstick, brand strategy, creator marketing',
  openGraph: {
    title: 'Creatorstick Media — Coming Soon',
    description: 'Something bold is launching soon. Stay tuned.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="font-montserrat antialiased">
        {children}
      </body>
    </html>
  );
}
