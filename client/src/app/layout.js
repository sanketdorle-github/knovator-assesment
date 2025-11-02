import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Fetcher - Dashboard',
  description: 'Monitor job import logs and browse job listings',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}