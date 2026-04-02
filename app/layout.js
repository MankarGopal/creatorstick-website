import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ThemeProvider from './components/ThemeProvider';

export const metadata = {
  title: 'Creatorstick Media | Premium Media Agency',
  description: 'Creatorstick Media Private Limited — A premium media agency specializing in brand strategy, creator marketing, content production, and corporate media solutions.',
  keywords: 'media agency, brand strategy, creator marketing, content production, influencer marketing, digital marketing',
  openGraph: {
    title: 'Creatorstick Media | Premium Media Agency',
    description: 'Transform your brand with Creatorstick Media — Premium media solutions that create lasting impact.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="font-montserrat antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
