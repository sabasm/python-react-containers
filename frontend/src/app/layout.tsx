import type { Metadata } from "next";
import Link from 'next/link';
import "./globals.css";
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: "Bikeland",
  description: "Enjoy the ride",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Bikeland</h1>
          </header>
          <main className={styles.main}>
            {children}
          </main>
          <footer className={styles.footer}>
            <Link
              href="https://sabasmendivil.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              &copy; {new Date().getFullYear()} Bikeland
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}