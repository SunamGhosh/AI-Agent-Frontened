import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { adminAPI } from '../services/api';

interface Quiz {
  _id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: string;
  questions: any[];
  userId: {
    username: string;
    email: string;
  };
  createdAt: string;
  completed: boolean;
  score?: number;
}

const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await adminAPI.getAllQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (quizId: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;

    try {
      await adminAPI.deleteQuiz(quizId);
      fetchQuizzes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Management</h1>
          <p className="text-gray-600">View all quizzes created by students</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">All Quizzes ({quizzes.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject & Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizzes.map((quiz) => (
                  <tr key={quiz._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{quiz.userId.username}</div>
                        <div className="text-sm text-gray-500">{quiz.userId.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>{quiz.subject}</div>
                        <div className="text-gray-500">{quiz.topic}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.questions.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        quiz.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {quiz.completed ? 'Completed' : 'In Progress'}
                      </span>
                      {quiz.score !== undefined && (
                        <div className="text-sm text-gray-500 mt-1">
                          Score: {quiz.score}%
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(quiz.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedQuiz(quiz)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => deleteQuiz(quiz._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quiz Details Modal */}
        {selectedQuiz && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-3/4 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Quiz Details</h3>
                  <button
                    onClick={() => setSelectedQuiz(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedQuiz.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedQuiz.userId.username}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedQuiz.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Topic</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedQuiz.topic}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{selectedQuiz.difficulty}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedQuiz.completed ? 'Completed' : 'In Progress'}
                      {selectedQuiz.score !== undefined && ` (${selectedQuiz.score}%)`}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {selectedQuiz.questions.map((question, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Question {index + 1}: {question.question}
                        </h4>
                        <div className="space-y-1">
                          {question.options.map((option: string, optionIndex: number) => (
                            <div
                              key={optionIndex}
                              className={`text-sm p-2 rounded ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-100 text-green-800 font-medium'
                                  : 'text-gray-600'
                              }`}
                            >
                              {optionIndex + 1}. {option}
                            </div>
                          ))}
                        </div>
                        {question.explanation && (
                          <div className="mt-2 text-sm text-gray-600">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuizzes;
