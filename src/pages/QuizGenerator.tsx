import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Play, BarChart3, BookOpen } from 'lucide-react';
import { quizAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const QuizGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [quizForm, setQuizForm] = useState({
    subject: '',
    topic: '',
    difficulty: 'medium',
    learningGaps: [],
  });

  const subjects = [
    'Mathematics',
    'Science',
    'History',
    'Literature',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Languages',
    'Art',
    'Music',
    'Geography',
  ];

  const topics = {
    Mathematics: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
    Science: ['Physics', 'Chemistry', 'Biology', 'Earth Science'],
    History: ['World History', 'Ancient Civilizations', 'Modern History'],
    Literature: ['Poetry', 'Fiction', 'Drama', 'Literary Analysis'],
    Physics: ['Mechanics', 'Thermodynamics', 'Electricity', 'Optics'],
    Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
    Biology: ['Cell Biology', 'Genetics', 'Ecology', 'Human Biology'],
    'Computer Science': ['Programming', 'Algorithms', 'Data Structures', 'Web Development'],
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const [quizzesResponse, analyticsResponse] = await Promise.all([
        quizAPI.getQuizzes(),
        quizAPI.getAnalytics(),
      ]);
      setQuizzes(quizzesResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!quizForm.subject || !quizForm.topic) {
      alert('Please select both subject and topic');
      return;
    }

    setGenerating(true);
    try {
      const response = await quizAPI.generateQuiz(quizForm);
      const newQuiz = response.data.quiz;
      setQuizzes([response.data, ...quizzes]);
      setOpenDialog(false);
      setQuizForm({
        subject: '',
        topic: '',
        difficulty: 'medium',
        learningGaps: [],
      });

      // Navigate to take the quiz
      navigate(`/quiz/${response.data.quizId}`);
    } catch (error) {
      console.error('Error generating quiz:', error);

      // Check for quota exceeded error
      if (error.response?.data?.error?.includes('429') ||
          error.response?.data?.error?.includes('quota') ||
          error.response?.data?.error?.includes('Too Many Requests') ||
          error.response?.data?.error?.includes('exceeded your current quota')) {
        alert('🚫 Quiz Generation Limit Reached!\n\nYou\'ve reached the daily limit for AI-generated quizzes (20 requests per day on the free plan).\n\n⏰ Please wait 24 hours for the quota to reset, or consider upgrading your plan for unlimited access.\n\n💡 Try again tomorrow or use pre-made quizzes in the meantime!');
      } else {
        alert('Failed to generate quiz. Please try again.');
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleTakeQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleViewResults = (quizId) => {
    navigate(`/quiz/${quizId}/results`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50">
      <Navbar />
      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Smart Quiz Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AI-powered quizzes that adapt to your learning gaps and current skill level. Track progress and improve continuously.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            Welcome back, <span className="font-semibold text-gray-900">{user?.username}</span>
          </div>
          <button
            onClick={() => setOpenDialog(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Generate New Quiz
          </button>
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{analytics.totalQuizzes}</div>
              <div className="text-sm text-gray-600">Total Quizzes</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{analytics.averageScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{analytics.recentPerformance.length}</div>
              <div className="text-sm text-gray-600">Recent Quizzes</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-lg font-bold text-orange-600 mb-1">Analytics</div>
              <div className="text-sm text-gray-600">Performance Insights</div>
            </div>
          </div>
        )}

        {/* Recent Performance */}
        {analytics?.recentPerformance?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analytics.recentPerformance.map((performance, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{performance.subject}</h3>
                      <p className="text-sm text-gray-600">{performance.topic}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{performance.score}%</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(performance.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Your Quizzes</h2>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : quizzes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes yet</h3>
                <p className="text-gray-600 mb-6">
                  Generate your first quiz to get started with learning gap-based assessments
                </p>
                <button
                  onClick={() => setOpenDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Create Your First Quiz
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <div key={quiz._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{quiz.title}</h3>
                        <p className="text-sm text-gray-600">{quiz.subject} - {quiz.topic}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">
                        Score: <span className="font-semibold text-gray-900">
                          {quiz.score || 'Not completed'}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!quiz.completed ? (
                        <button
                          onClick={() => handleTakeQuiz(quiz._id)}
                          className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Take Quiz
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewResults(quiz._id)}
                          className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                        >
                          View Results
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Generate Quiz Dialog */}
        {openDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate New Quiz</h2>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    Our AI will analyze your learning gaps and create a personalized quiz to help you improve.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Subject</label>
                  <select
                    value={quizForm.subject}
                    onChange={(e) =>
                      setQuizForm({
                        ...quizForm,
                        subject: e.target.value,
                        topic: '', // Reset topic when subject changes
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {quizForm.subject && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Topic</label>
                    <select
                      value={quizForm.topic}
                      onChange={(e) =>
                        setQuizForm({ ...quizForm, topic: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                    >
                      <option value="">Select a topic</option>
                      {topics[quizForm.subject]?.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Difficulty Level</label>
                  <select
                    value={quizForm.difficulty}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, difficulty: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Learning Gaps (optional)
                  </label>
                  <textarea
                    value={quizForm.learningGaps.join('\n')}
                    onChange={(e) =>
                      setQuizForm({
                        ...quizForm,
                        learningGaps: e.target.value.split('\n').filter(gap => gap.trim()),
                      })
                    }
                    placeholder="Specify areas you want to focus on, one per line..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for AI to analyze your learning patterns
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setOpenDialog(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateQuiz}
                    disabled={generating || !quizForm.subject || !quizForm.topic}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {generating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      'Generate Quiz'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;

