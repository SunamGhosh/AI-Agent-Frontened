import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, TrendingUp, BookOpen } from 'lucide-react';

const QuizResults = () => {
  const {} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results;

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">Unable to load quiz results. Please try again.</p>
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const { totalQuestions, correctAnswers, results: questionResults } = results;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = percentage >= 70;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 border-green-200';
    if (score >= 60) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className={`text-center rounded-2xl p-8 mb-8 border-2 ${getScoreBgColor(percentage)}`}>
          <div className="mb-6">
            {isPassed ? (
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            ) : (
              <X className="w-16 h-16 text-red-600 mx-auto mb-4" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Quiz Complete!
          </h1>

          <div className="text-6xl font-black mb-4">
            <span className={getScoreColor(percentage)}>{percentage}%</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            You got <span className="font-semibold">{correctAnswers}</span> out of <span className="font-semibold">{totalQuestions}</span> questions correct
          </p>

          <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${isPassed ? 'bg-yellow-500 text-black' : 'bg-yellow-400 text-black'}`}>
            {isPassed ? '🎉 Passed!' : 'Keep Practicing!'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => navigate('/quizzes')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-600 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Take Another Quiz
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Performance Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">{totalQuestions}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-600 mb-1">{totalQuestions - correctAnswers}</div>
              <div className="text-sm text-gray-600">Incorrect Answers</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0%</span>
              <span className={`font-semibold ${getScoreColor(percentage)}`}>{percentage}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Question Review</h2>

          <div className="space-y-6">
            {questionResults?.map((result, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-6 ${result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {result.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-semibold text-gray-900">
                        Question {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Your Answer: </span>
                        <span className={`font-semibold ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {String.fromCharCode(65 + result.userAnswer)}
                        </span>
                      </div>

                      {!result.isCorrect && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Correct Answer: </span>
                          <span className="font-semibold text-green-700">
                            {String.fromCharCode(65 + result.correctAnswer)}
                          </span>
                        </div>
                      )}

                      {result.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-sm font-medium text-blue-800 mb-1">Explanation:</div>
                          <div className="text-sm text-blue-700">{result.explanation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              {isPassed ? '🎉 Excellent Work!' : '💪 Keep Learning!'}
            </h3>
            <p className="text-lg mb-6 text-blue-100">
              {isPassed
                ? 'You\'ve demonstrated strong understanding of this material. Keep up the great work!'
                : 'Every expert was once a beginner. Review the explanations and try again - you\'re getting better with each attempt!'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/learning')}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Get AI Help
              </button>
              <button
                onClick={() => navigate('/quizzes')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Try Another Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;

