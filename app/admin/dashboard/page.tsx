import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import Link from 'next/link';
import { FolderKanban, Users, Eye } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  await connectDB();

  // Get statistics
  const totalProjects = await Project.countDocuments();
  const latestProjects = await Project.countDocuments({ category: 'latest' });
  const upcomingProjects = await Project.countDocuments({ category: 'upcoming' });

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      title: 'Latest Projects',
      value: latestProjects,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      title: 'Upcoming Projects',
      value: upcomingProjects,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back, {session?.user?.name || 'Admin'}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-promice-red transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/projects?action=add"
            className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-promice-red rounded-lg transition-colors group"
          >
            <FolderKanban className="w-5 h-5 text-promice-red group-hover:text-white" />
            <span className="text-white">Add New Project</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-promice-red rounded-lg transition-colors group"
          >
            <Eye className="w-5 h-5 text-promice-red group-hover:text-white" />
            <span className="text-white">Manage Projects</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Projects</h2>
        <div className="space-y-3">
          {totalProjects === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No projects yet. Add your first project to get started!
            </p>
          ) : (
            <p className="text-gray-400">
              You have {totalProjects} projects in total. Manage them from the Projects page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
