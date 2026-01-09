import { useState } from 'react';
import Navbar from '../components/Navbar';
import { translationAPI } from '../services/api';

const AdminTranslation = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ru', name: 'Russian' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await translationAPI.translate({
        text: inputText,
        sourceLang,
        targetLang
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setError('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Translation Tools</h1>
          <p className="text-gray-600">Translate text between different languages</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Language */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Target Language */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 resize-none"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <button
              onClick={swapLanguages}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              🔄 Swap Languages
            </button>

            <button
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Educational Content Translation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Educational Content Translation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use this tool to translate educational materials, explanations, and learning content for students.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">📚 Content Translation</h4>
                <p className="text-sm text-blue-700">
                  Translate complex educational content while maintaining academic accuracy and terminology.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">📝 Quiz Translation</h4>
                <p className="text-sm text-green-700">
                  Create multilingual quizzes by translating questions, answers, and explanations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTranslation;
