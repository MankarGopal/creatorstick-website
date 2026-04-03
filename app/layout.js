import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ThemeProvider from './components/ThemeProvider';
import StickyCTA from './components/StickyCTA';

export const metadata = {
  title: 'CreatorStick Media | Digital Marketing & Brand Building Agency India',
  description: 'CreatorStick Media Private Limited — India\'s fresh, bold media agency specializing in brand strategy, content growth, creator marketing, digital product development, social media management, and brand building. Transform your brand with CreatorStick.',
  keywords: 'CreatorStick, CreatorStick Media, media agency India, brand strategy, creator marketing, content production, influencer marketing, digital marketing, content growth, brand building, social media management, digital product development, performance marketing',
  openGraph: {
    title: 'CreatorStick Media | Digital Marketing & Brand Building Agency',
    description: 'CreatorStick Media — Premium content growth and brand building solutions. Transform your brand with bold storytelling, creative campaigns, and next-gen digital strategy.',
    type: 'website',
    siteName: 'CreatorStick Media',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorStick Media | Content Growth & Brand Building',
    description: 'Bold storytelling, creative campaigns, and next-gen digital strategy by CreatorStick Media.',
  },
  alternates: {
    canonical: 'https://creatorstick.com',
  },
  robots: {
    index: true,
    follow: true,
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
          <StickyCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
