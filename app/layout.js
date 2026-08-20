import './globals.css';

export const metadata = { title: 'The Party Personality Test', description: 'A mysterious little party personality quiz.' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
