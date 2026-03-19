import type { Metadata } from 'next';
import '../../shared/styles/globals.scss';
import { ThemeProvider } from '../../shared/contexts/ThemeContext';
import { LocaleProvider } from '../../shared/contexts/LocaleContext';
import ruMessages from '../../../messages/ru.json';

export const metadata: Metadata = {
  title: 'Сайт-портфолио',
  description: 'Портфолио Frontend разработчика',
};

export default function RussianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <LocaleProvider locale="ru" messages={ruMessages}>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
