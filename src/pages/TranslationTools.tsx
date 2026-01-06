import { useState, useEffect } from 'react';
import { Languages, ArrowLeftRight, GraduationCap, FileText } from 'lucide-react';
import { translationAPI } from '../services/api';
import Navbar from '../components/Navbar';

const TranslationTools = () => {
  const [activeTab, setActiveTab] = useState(0);
const [languages, setLanguages] = useState<Record<string, string>>({});
  const [translationData, setTranslationData] = useState({
    text: '',
    fromLang: 'en',
    toLang: 'es',
    translatedText: '',
    loading: false,
  });
  const [educationalData, setEducationalData] = useState({
    content: '',
    contentType: 'text',
    fromLang: 'en',
    toLang: 'es',
    translatedContent: '',
    loading: false,
  });
  const [quizData, setQuizData] = useState({
    questions: [],
    fromLang: 'en',
    toLang: 'es',
    translatedQuestions: [],
    loading: false,
  });

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      const response = await translationAPI.getLanguages();
      setLanguages(response.data.languages);
    } catch (error) {
      console.error('Error loading languages:', error);
    }
  };

  const handleTranslate = async () => {
    if (!translationData.text.trim()) return;

    setTranslationData({ ...translationData, loading: true });
    try {
      const response = await translationAPI.translate({
        text: translationData.text,
        fromLang: translationData.fromLang,
        toLang: translationData.toLang,
      });

      setTranslationData({
        ...translationData,
        translatedText: response.data.translatedText,
        loading: false,
      });
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationData({ ...translationData, loading: false });
    }
  };

  const handleEducationalTranslate = async () => {
    if (!educationalData.content.trim()) return;

    setEducationalData({ ...educationalData, loading: true });
    try {
      const response = await translationAPI.translateEducationalContent({
        content: educationalData.content,
        contentType: educationalData.contentType,
        fromLang: educationalData.fromLang,
        toLang: educationalData.toLang,
      });

      setEducationalData({
        ...educationalData,
        translatedContent: response.data.translatedContent,
        loading: false,
      });
    } catch (error) {
      console.error('Educational translation error:', error);
      setEducationalData({ ...educationalData, loading: false });
    }
  };

  const handleQuizTranslate = async () => {
    if (!quizData.questions.length) return;

    setQuizData({ ...quizData, loading: true });
    try {
      const response = await translationAPI.translateQuiz({
        questions: quizData.questions,
        fromLang: quizData.fromLang,
        toLang: quizData.toLang,
      });

      setQuizData({
        ...quizData,
        translatedQuestions: response.data.translatedQuestions,
        loading: false,
      });
    } catch (error) {
      console.error('Quiz translation error:', error);
      setQuizData({ ...quizData, loading: false });
    }
  };

  const addQuizQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: '',
        },
      ],
    });
  };

  const updateQuizQuestion = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const swapLanguages = () => {
    setTranslationData({
      ...translationData,
      fromLang: translationData.toLang,
      toLang: translationData.fromLang,
      text: translationData.translatedText,
      translatedText: translationData.text,
    });
  };

  const tabs = [
    { label: 'General Translation', icon: Languages },
    { label: 'Educational Content', icon: GraduationCap },
    { label: 'Quiz Translation', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50">
      <Navbar />
      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <Languages className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Translation Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Break language barriers in education with our AI-powered translation tools for educational content and accessibility.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === index
                    ? 'bg-yellow-500 text-black border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* General Translation Tab */}
            {activeTab === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">General Text Translation</h2>
                  <p className="text-gray-600">
                    Translate any text between supported languages for educational purposes.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
                  <p className="text-sm text-blue-800">
                    💡 Translate educational content, notes, articles, and more across multiple languages.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">From Language</label>
                      <select
                        value={translationData.fromLang}
                        onChange={(e) =>
                          setTranslationData({ ...translationData, fromLang: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                      >
                        {Object.entries(languages).map(([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      value={translationData.text}
                      onChange={(e) =>
                        setTranslationData({ ...translationData, text: e.target.value })
                      }
                      placeholder="Enter text to translate..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white resize-none"
                      rows={6}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={swapLanguages}
                      className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
                    >
                      <ArrowLeftRight className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  <div className="space-y-4 lg:col-span-1">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">To Language</label>
                      <select
                        value={translationData.toLang}
                        onChange={(e) =>
                          setTranslationData({ ...translationData, toLang: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                      >
                        {Object.entries(languages).map(([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <textarea
                        value={translationData.translatedText}
                        readOnly
                        placeholder="Translation will appear here..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 resize-none"
                        rows={6}
                      />
                      {translationData.translatedText && (
                        <button
                          onClick={() => navigator.clipboard.writeText(translationData.translatedText)}
                          className="absolute top-2 right-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                          title="Copy to clipboard"
                        >
                          📋
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleTranslate}
                    disabled={translationData.loading || !translationData.text.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-3 mx-auto"
                  >
                    {translationData.loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Translating...
                      </>
                    ) : (
                      <>
                        <Languages className="w-5 h-5" />
                        Translate
                      </>
                    )}
                  </button>
                </div>

                {translationData.translatedText && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                      ✅ Translation completed! The text has been translated from {languages[translationData.fromLang]} to {languages[translationData.toLang]}.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Educational Content Translation Tab */}
            {activeTab === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Educational Content Translation</h2>
                  <p className="text-gray-600">
                    Specialized translation for educational materials with subject-specific terminology.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-6">
                  <p className="text-sm text-green-800">
                    🎓 Optimized for educational content with proper terminology translation.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
                        <select
                          value={educationalData.contentType}
                          onChange={(e) =>
                            setEducationalData({ ...educationalData, contentType: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                        >
                          <option value="text">General Text</option>
                          <option value="lesson">Lesson Content</option>
                          <option value="explanation">Explanation</option>
                          <option value="definition">Definition</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">From Language</label>
                        <select
                          value={educationalData.fromLang}
                          onChange={(e) =>
                            setEducationalData({ ...educationalData, fromLang: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                        >
                          {Object.entries(languages).map(([code, name]) => (
                            <option key={code} value={code}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <textarea
                      value={educationalData.content}
                      onChange={(e) =>
                        setEducationalData({ ...educationalData, content: e.target.value })
                      }
                      placeholder="Enter educational content to translate..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white resize-none"
                      rows={8}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">To Language</label>
                      <select
                        value={educationalData.toLang}
                        onChange={(e) =>
                          setEducationalData({ ...educationalData, toLang: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                      >
                        {Object.entries(languages).map(([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <textarea
                        value={educationalData.translatedContent}
                        readOnly
                        placeholder="Translated educational content will appear here..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 resize-none"
                        rows={8}
                      />
                      {educationalData.translatedContent && (
                        <button
                          onClick={() => navigator.clipboard.writeText(educationalData.translatedContent)}
                          className="absolute top-2 right-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                          title="Copy to clipboard"
                        >
                          📋
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleEducationalTranslate}
                    disabled={educationalData.loading || !educationalData.content.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 flex items-center justify-center gap-3 mx-auto"
                  >
                    {educationalData.loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Translating...
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-5 h-5" />
                        Translate Educational Content
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Translation Tab */}
            {activeTab === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Question Translation</h2>
                  <p className="text-gray-600">
                    Translate quiz questions and answers for multilingual education.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 mb-6">
                  <p className="text-sm text-purple-800">
                    📝 Perfect for creating multilingual quizzes and assessments.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <select
                    value={quizData.fromLang}
                    onChange={(e) =>
                      setQuizData({ ...quizData, fromLang: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                  >
                    {Object.entries(languages).map(([code, name]) => (
                      <option key={code} value={code}>
                        From: {name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={quizData.toLang}
                    onChange={(e) =>
                      setQuizData({ ...quizData, toLang: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                  >
                    {Object.entries(languages).map(([code, name]) => (
                      <option key={code} value={code}>
                        To: {name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={addQuizQuestion}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25"
                  >
                    Add Question
                  </button>
                </div>

                {quizData.questions.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Question {index + 1}</h3>

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Question text"
                        value={question.question}
                        onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white"
                      />

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Answer Options:</label>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold text-sm">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <input
                              type="text"
                              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options];
                                newOptions[optionIndex] = e.target.value;
                                updateQuizQuestion(index, 'options', newOptions);
                              }}
                              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuizQuestion(index, 'correctAnswer', optionIndex)}
                              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                question.correctAnswer === optionIndex
                                  ? 'bg-yellow-500 text-black'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              Correct
                            </button>
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        placeholder="Explanation"
                        value={question.explanation}
                        onChange={(e) => updateQuizQuestion(index, 'explanation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white"
                      />
                    </div>
                  </div>
                ))}

                {quizData.questions.length > 0 && (
                  <div className="text-center">
                    <button
                      onClick={handleQuizTranslate}
                      disabled={quizData.loading}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 flex items-center justify-center gap-3 mx-auto"
                    >
                      {quizData.loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Translating Quiz...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5" />
                          Translate Quiz
                        </>
                      )}
                    </button>
                  </div>
                )}

                {quizData.translatedQuestions.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Translated Questions</h3>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                      <p className="text-sm text-green-800">
                        ✅ Quiz questions have been translated from {languages[quizData.fromLang]} to {languages[quizData.toLang]}.
                      </p>
                    </div>

                    {quizData.translatedQuestions.map((question, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Question {index + 1} (Translated)</h4>
                        <p className="text-gray-700 mb-4">{question.question}</p>

                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-gray-700">Answer Options:</h5>
                          {question.options?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                question.correctAnswer === optionIndex
                                  ? 'bg-green-100 border-green-300 text-green-800'
                                  : 'bg-gray-50 border-gray-200 text-gray-700'
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}. {option}
                            </div>
                          ))}
                        </div>

                        {question.explanation && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h5 className="font-medium text-blue-800 mb-1">Explanation:</h5>
                            <p className="text-blue-700">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationTools;

