import { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Trophy, Calendar, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    learningProfile: {
      subjects: [],
      currentLevel: '',
      learningGoals: ''
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        learningProfile: {
          subjects: user.learningProfile?.subjects || [],
          currentLevel: user.learningProfile?.currentLevel || '',
          learningGoals: user.learningProfile?.learningGoals || ''
        }
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
      } else {
        alert('Failed to update profile: ' + result.message);
      }
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      learningProfile: {
        subjects: user?.learningProfile?.subjects || [],
        currentLevel: user?.learningProfile?.currentLevel || '',
        learningGoals: user?.learningProfile?.learningGoals || ''
      }
    });
    setIsEditing(false);
  };

  const subjects = [
    'Mathematics', 'Science', 'History', 'Literature', 'Physics',
    'Chemistry', 'Biology', 'Computer Science', 'Languages', 'Art',
    'Music', 'Geography'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50">
        <Navbar />
        <div className="w-full px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Please log in to view your profile</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50">
      <Navbar />
      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Manage your account settings and learning preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-2xl">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.username}</h2>
                <p className="text-gray-600 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Level: {user.learningProfile?.currentLevel || 'Beginner'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{user.username}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{user.email}</p>
                </div>

                {/* Current Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Learning Level
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.learningProfile.currentLevel}
                      onChange={(e) => setFormData({
                        ...formData,
                        learningProfile: {...formData.learningProfile, currentLevel: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Level</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {user.learningProfile?.currentLevel || 'Not set'}
                    </p>
                  )}
                </div>

                {/* Subjects */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects of Interest
                  </label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {subjects.map(subject => (
                        <label key={subject} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.learningProfile.subjects.includes(subject)}
                            onChange={(e) => {
                              const newSubjects = e.target.checked
                                ? [...formData.learningProfile.subjects, subject]
                                : formData.learningProfile.subjects.filter(s => s !== subject);
                              setFormData({
                                ...formData,
                                learningProfile: {...formData.learningProfile, subjects: newSubjects}
                              });
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.learningProfile?.subjects?.length > 0 ? (
                        user.learningProfile.subjects.map(subject => (
                          <span
                            key={subject}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No subjects selected</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Learning Goals */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Goals
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.learningProfile.learningGoals}
                      onChange={(e) => setFormData({
                        ...formData,
                        learningProfile: {...formData.learningProfile, learningGoals: e.target.value}
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your learning goals..."
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {user.learningProfile?.learningGoals || 'No goals set'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Subjects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user.learningProfile?.subjects?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user.learningProfile?.currentLevel || 'Beginner'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
