import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Brain, FileText, Languages, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      name: 'AI Learning Assistant',
      path: '/learning',
      icon: <Brain className="w-5 h-5" />,
    },
    {
      name: 'Smart Quiz Generator',
      path: '/quizzes',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: 'Translation Tools',
      path: '/translation',
      icon: <Languages className="w-5 h-5" />,
    },
    ...(isAdmin ? [{
      name: 'Admin Panel',
      path: '/admin',
      icon: <Shield className="w-5 h-5" />,
    }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EduAgent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/profile')
                  ? 'bg-blue-100 text-blue-700 shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive('/profile')
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
