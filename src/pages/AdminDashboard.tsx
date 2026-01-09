import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { adminAPI } from '../services/api';

interface AdminStats {
  totalUsers: number;
  totalQuizzes: number;
  totalSessions: number;
  adminUsers: number;
  regularUsers: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const adminFeatures = [
    {
      title: 'User Management',
      description: 'View and manage all users',
      path: '/admin/users',
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      title: 'Quiz Management',
      description: 'View all quizzes and student performance',
      path: '/admin/quizzes',
      icon: '📝',
      color: 'bg-green-500'
    },
    {
      title: 'Learning Sessions',
      description: 'Monitor learning sessions and chat interactions',
      path: '/admin/sessions',
      icon: '💬',
      color: 'bg-purple-500'
    },
    {
      title: 'Translation Tools',
      description: 'Access translation functionality',
      path: '/admin/translation',
      icon: '🌐',
      color: 'bg-orange-500'
    },
    {
      title: 'Generate Quiz',
      description: 'Create quizzes for students',
      path: '/admin/quiz-generator',
      icon: '✨',
      color: 'bg-indigo-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, content, and monitor system activity</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalQuizzes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Learning Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <span className="text-2xl">👑</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Admin Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.adminUsers}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 ${feature.color} text-white rounded-lg`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
