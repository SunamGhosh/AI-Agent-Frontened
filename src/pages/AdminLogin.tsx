import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Check if user is admin
        if (result.user?.role === 'admin') {
          navigate('/admin');
        } else {
          setError('Access denied. This login is for administrators only.');
          // Logout the non-admin user
          localStorage.removeItem('token');
          window.location.reload();
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50/50 to-yellow-50/30 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-400/15 to-yellow-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-lg shadow-red-500/25 mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Admin Login
          </h2>
          <p className="text-lg text-gray-600">
            Access administrative controls
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-red-500/10 border border-white/20 p-8">
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6 animate-fade-in-up">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">!</span>
                </div>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 pl-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                  placeholder="Enter admin email"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 pl-12 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                  placeholder="Enter admin password"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-red-600 hover:text-red-700 font-semibold">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Signing In...
                </div>
              ) : (
                'Admin Login'
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Admin Actions</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                to="/admin/register"
                className="w-full inline-flex justify-center py-3 px-4 border border-red-300 rounded-2xl shadow-sm bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
              >
                Register New Admin
              </Link>
              <Link
                to="/login"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-2xl shadow-sm bg-white text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Regular User Login
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Need help?{' '}
              <button className="text-red-600 hover:text-red-700 font-bold hover:underline transition-all">
                Contact Support
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <button className="text-red-600 hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-red-600 hover:underline">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
