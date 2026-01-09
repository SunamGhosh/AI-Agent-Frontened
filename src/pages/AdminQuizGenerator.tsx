import { useState } from 'react';
import Navbar from '../components/Navbar';
import { quizAPI } from '../services/api';

interface QuizData {
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  numberOfQuestions: number;
  learningGaps?: string[];
}

const AdminQuizGenerator = () => {
  const [quizData, setQuizData] = useState<QuizData>({
    subject: '',
    topic: '',
    difficulty: 'medium',
    numberOfQuestions: 5,
    learningGaps: []
  });

  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'History',
    'Geography',
    'Literature',
    'Languages',
    'Economics',
    'Psychology',
    'Philosophy'
  ];

  const handleInputChange = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateQuiz = async () => {
    if (!quizData.subject || !quizData.topic) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await quizAPI.generateQuiz(quizData);
      setGeneratedQuiz(response.data.quiz);
    } catch (error) {
      console.error('Quiz generation error:', error);
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLearningGapChange = (gaps: string) => {
    const gapArray = gaps.split(',').map(gap => gap.trim()).filter(gap => gap);
    setQuizData(prev => ({
      ...prev,
      learningGaps: gapArray
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Quiz Generator</h1>
          <p className="text-gray-600">Create customized quizzes for students using AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quiz Generation Form */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate New Quiz</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  value={quizData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic *
                </label>
                <input
                  type="text"
                  value={quizData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  placeholder="e.g., Algebra, Photosynthesis, World War II"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={quizData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Questions
                </label>
                <select
                  value={quizData.numberOfQuestions}
                  onChange={(e) => handleInputChange('numberOfQuestions', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={3}>3 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={7}>7 Questions</option>
                  <option value={10}>10 Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learning Gaps (Optional)
                </label>
                <textarea
                  value={quizData.learningGaps?.join(', ') || ''}
                  onChange={(e) => handleLearningGapChange(e.target.value)}
                  placeholder="e.g., basic algebra, quadratic equations, fractions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple gaps with commas
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating Quiz...' : 'Generate Quiz'}
              </button>
            </div>
          </div>

          {/* Quiz Preview */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quiz Preview</h2>

            {generatedQuiz ? (
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900">{generatedQuiz.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {generatedQuiz.subject} • {generatedQuiz.topic} • {generatedQuiz.difficulty}
                  </p>
                </div>

                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {generatedQuiz.questions.map((question: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        {index + 1}. {question.question}
                      </h4>

                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 border border-green-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            <span className="text-sm">
                              {String.fromCharCode(65 + optionIndex)}. {option}
                            </span>
                            {optionIndex === question.correctAnswer && (
                              <span className="text-green-600 text-xs ml-2">(Correct Answer)</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {question.explanation && (
                        <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Quiz Generated Yet</h3>
                <p className="text-gray-600">
                  Fill out the form and click "Generate Quiz" to create a customized quiz.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🎯 Quiz Generation Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">📚 Subject Focus</h4>
              <p className="text-sm text-blue-700">
                Choose specific subjects and narrow topics for more targeted questions.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">🎯 Difficulty Levels</h4>
              <p className="text-sm text-green-700">
                Match difficulty to student level. Easy for beginners, hard for advanced learners.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">🔍 Learning Gaps</h4>
              <p className="text-sm text-purple-700">
                Specify learning gaps to focus questions on areas needing improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizGenerator;
