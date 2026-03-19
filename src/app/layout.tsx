// This file is required for the app directory to work.
// It's used only for the root layout and should not render anything.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
