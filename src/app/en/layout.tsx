import type { Metadata } from 'next';
import '../../shared/styles/globals.scss';
import { ThemeProvider } from '@/shared/contexts/ThemeContext';
import { LocaleProvider } from '@/shared/contexts/LocaleContext';
import enMessages from '../../../messages/en.json';

export const metadata: Metadata = {
  title: 'Druzhenkov Grigory',
  description: 'Frontend Developer Portfolio',
};

export default function EnglishLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LocaleProvider locale="en" messages={enMessages}>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
