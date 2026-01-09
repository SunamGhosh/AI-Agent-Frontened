import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Send, BookOpen} from 'lucide-react';
import { learningAPI } from '../services/api';
// import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const LearningAssistant = () => {
  // const {} = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessionData, setSessionData] = useState({
    subject: '',
    topic: '',
    learningObjectives: [],
  });
  const [showSetup, setShowSetup] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleStartSession = async () => {
    if (!sessionData.subject || !sessionData.topic) {
      alert('Please select both subject and topic');
      return;
    }

    setLoading(true);
    try {
      const response = await learningAPI.startSession({
        subject: sessionData.subject,
        topic: sessionData.topic,
        learningObjectives: sessionData.learningObjectives,
      });

      setSessionId(response.data.sessionId);
      setShowSetup(false);

      // Add initial welcome message
      setMessages([
        {
          role: 'assistant',
          content: `Hello! I'm your AI learning assistant. I'll help you with ${sessionData.subject} - ${sessionData.topic}. What would you like to learn or what questions do you have?`,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Failed to start learning session');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await learningAPI.chat({
        message: inputMessage,
        sessionId,
        subject: sessionData.subject,
        topic: sessionData.topic,
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      let errorContent = 'Sorry, I encountered an error. Please try again.';

      // Check for quota exceeded error
      if (error.response?.data?.error?.includes('429') ||
          error.response?.data?.error?.includes('quota') ||
          error.response?.data?.error?.includes('Too Many Requests') ||
          error.response?.data?.error?.includes('exceeded your current quota') ||
          error.response?.status === 429) {
        errorContent = '🚫 AI Chat Limit Reached!\n\nYou\'ve reached the daily limit for AI chat interactions (20 requests per day on the free plan).\n\n⏰ Please wait 24 hours for the quota to reset, or consider upgrading your plan for unlimited access.\n\n💡 Try again tomorrow!';
      }

      const errorMessage = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEndSession = async () => {
    if (sessionId) {
      try {
        await learningAPI.endSession(sessionId);
        alert('Learning session ended successfully!');
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
    setSessionId(null);
    setMessages([]);
    setShowSetup(true);
    setSessionData({ subject: '', topic: '', learningObjectives: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/50">
      <Navbar />
      <div className="w-full px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-2">
            AI Learning Assistant
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Get personalized help from our advanced AI tutor. Ask questions, get explanations, and learn at your own pace.
          </p>
        </div>

        {showSetup ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Start a Learning Session</h2>
              <p className="text-gray-600 mb-8 text-center">
                Tell us what you'd like to learn about, and our AI assistant will provide personalized guidance.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Subject</label>
                  <select
                    value={sessionData.subject}
                    onChange={(e) =>
                      setSessionData({
                        ...sessionData,
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

                {sessionData.subject && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Topic</label>
                    <select
                      value={sessionData.topic}
                      onChange={(e) =>
                        setSessionData({ ...sessionData, topic: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white"
                    >
                      <option value="">Select a topic</option>
                      {topics[sessionData.subject]?.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Learning Objectives (optional)
                  </label>
                  <textarea
                    value={sessionData.learningObjectives.join('\n')}
                    onChange={(e) =>
                      setSessionData({
                        ...sessionData,
                        learningObjectives: e.target.value.split('\n').filter(obj => obj.trim()),
                      })
                    }
                    placeholder="Enter your learning goals, one per line..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">What do you want to achieve in this session?</p>
                </div>

                <button
                  onClick={handleStartSession}
                  disabled={loading || !sessionData.subject || !sessionData.topic}
                  className="w-full bg-yellow-500 text-black py-4 px-6 rounded-2xl font-bold hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Starting Session...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5" />
                      Start Learning Session
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* Session Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Session: {sessionData.subject} - {sessionData.topic}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    AI-powered personalized learning assistant
                  </p>
                </div>
                <button
                  onClick={handleEndSession}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                >
                  End Session
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-yellow-500 text-black ml-12'
                          : 'bg-gray-100 text-gray-900 mr-12'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your AI learning assistant anything..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 hover:bg-white disabled:opacity-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !inputMessage.trim()}
                    className="px-6 py-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningAssistant;


