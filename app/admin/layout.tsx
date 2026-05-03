import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If authenticated, show admin layout with nav
  if (session) {
    return (
      <div className="min-h-screen bg-promice-dark">
        <AdminNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    );
  }

  // For unauthenticated users (login page), render without nav
  return <>{children}</>;
}
