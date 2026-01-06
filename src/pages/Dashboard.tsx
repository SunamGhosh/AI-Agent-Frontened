import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, FileText, Languages, TrendingUp, BookOpen, Lightbulb, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { learningAPI, quizAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [recResponse, quizResponse] = await Promise.all([
          learningAPI.getRecommendations(),
          quizAPI.getQuizzes(),
        ]);

        setRecommendations(recResponse.data);
        setRecentQuizzes(quizResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const quickActions = [
    {
      title: 'AI Learning Assistant',
      description: 'Get personalized help with any subject',
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      path: '/learning',
      color: 'bg-blue-600 hover:bg-yellow-600',
    },
    {
      title: 'Generate Quiz',
      description: 'Create quizzes based on your learning gaps',
      icon: <FileText className="w-8 h-8 text-red-600" />,
      path: '/quizzes',
      color: 'bg-red-600 hover:bg-yellow-600',
    },
    {
      title: 'Translation Tools',
      description: 'Translate educational content for accessibility',
      icon: <Languages className="w-8 h-8 text-green-600" />,
      path: '/translation',
      color: 'bg-green-600 hover:bg-yellow-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-lg">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur-lg opacity-20"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome back, {user?.username}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Your personalized learning dashboard • SDG 4 Quality Education
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online & Learning
              </div>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12.21-8.984 7.337-14.645C17.537 3.743 14.489 2.5 12 2.5s-5.537 1.243-7.337 3.81C-.449 8.516 1.799 16.5 9.761 16.5a8.95 8.95 0 01-1.893-.204l-3.497 3.497z" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-8">
        {/* Learning Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Current Level</h3>
            <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {user?.learningProfile?.currentLevel || 'Beginner'}
            </p>
            <p className="text-gray-600 text-sm">Keep learning to advance! 🚀</p>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {user?.learningProfile?.subjects?.length || 0} subjects
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {user?.learningProfile?.subjects?.slice(0, 3).map((subject) => (
                <span
                  key={subject}
                  className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              )) || (
                <p className="text-gray-600 text-sm">No subjects selected yet</p>
              )}
            </div>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                {recentQuizzes.length} recent
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Learning Activity</h3>
            <p className="text-gray-600 mb-2">
              {recentQuizzes.length > 0
                ? `${recentQuizzes.length} quiz${recentQuizzes.length > 1 ? 'es' : ''} completed this week`
                : 'Ready to start learning?'
              }
            </p>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-600">Active learner</span>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Quick Actions</h2>
            <p className="text-lg text-gray-600">Jump into your personalized learning experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer hover:-translate-y-2 relative overflow-hidden"
                onClick={() => navigate(action.path)}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mr-4 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                      {React.cloneElement(action.icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {action.description}
                  </p>

                  <button className={`${action.color} w-full text-blue py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105`}>
                    <span>Get Started</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        {recommendations && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
                AI Learning Recommendations
              </h2>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.nextTopics && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Next Topics to Study:</h3>
                      <div className="flex flex-wrap gap-2">
                        {recommendations.nextTopics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {recommendations.studyMethods && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Recommended Study Methods:</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {recommendations.studyMethods.map((method, index) => (
                          <li key={index}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Quizzes */}
        {recentQuizzes.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                Recent Quizzes
              </h2>
              <button
                onClick={() => navigate('/quizzes')}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
              >
                View All
                <Plus className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentQuizzes.map((quiz) => (
                <div key={quiz._id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{quiz.title}</h3>
                      <p className="text-gray-600 text-sm">{quiz.subject} - {quiz.topic}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Score: <span className="font-semibold text-gray-900">
                        {quiz.score || 'Not completed'}%
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {!quiz.completed ? (
                      <button
                        onClick={() => navigate(`/quiz/${quiz._id}`)}
                        className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                      >
                        Take Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/quiz/${quiz._id}/results`)}
                        className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                      >
                        View Results
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
