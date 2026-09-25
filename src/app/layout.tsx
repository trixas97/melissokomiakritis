// Root layout is a pass-through: the site's <html> shell lives in
// [locale]/layout.tsx and the Payload admin renders its own in (payload)/admin.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
