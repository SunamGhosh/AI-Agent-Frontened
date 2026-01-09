import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, User, Mail} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: '', // Special code for admin registration
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate admin code (you can change this to any code you want)
    if (formData.adminCode !== 'ADMIN2024') {
      setError('Invalid admin registration code. Contact system administrator.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        ...formData,
        role: 'admin', // Force admin role
        learningProfile: {
          subjects: ['Administration'],
          currentLevel: 'advanced',
          learningGoals: ['System administration', 'User management'],
        }
      });
      if (result.success) {
        navigate('/admin/login');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50/50 to-yellow-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Registration
          </h2>
          <p className="text-gray-600">
            Register as a system administrator
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin Code */}
            <div>
              <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Registration Code *
              </label>
              <div className="relative">
                <input
                  id="adminCode"
                  name="adminCode"
                  type="password"
                  required
                  value={formData.adminCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="Enter admin code"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Contact system administrator for the registration code
              </p>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Username *
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="Choose admin username"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email Address *
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
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="Enter admin email"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Create admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Admin Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Confirm admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-1">Admin Account Requirements</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Minimum 8 characters password</li>
                    <li>• Valid admin registration code required</li>
                    <li>• Must have administrative privileges</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Admin Account...
                </div>
              ) : (
                'Create Admin Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600">
              Already have an admin account?{' '}
              <Link
                to="/admin/login"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Admin Login
              </Link>
            </p>
            <p className="text-gray-600">
              Regular user?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                User Registration
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By creating an admin account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
