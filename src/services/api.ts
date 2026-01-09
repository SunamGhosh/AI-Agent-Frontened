import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ai-agent-backened.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (updates) => api.put('/api/auth/profile', updates),
};

// Learning API
export const learningAPI = {
  startSession: (sessionData) => api.post('/api/learning/session/start', sessionData),
  getRecommendations: () => api.get('/api/learning/recommendations'),
  chat: (chatData) => api.post('/api/learning/chat', chatData),
  getSessions: () => api.get('/api/learning/sessions'),
  endSession: (sessionId) => api.put(`/api/learning/session/${sessionId}/end`),
};

// Quiz API
export const quizAPI = {
  generateQuiz: (quizData) => api.post('/api/quizzes/generate', quizData),
  getQuizzes: () => api.get('/api/quizzes'),
  getQuiz: (quizId) => api.get(`/api/quizzes/${quizId}`),
  submitQuiz: (quizId, answers) => api.post(`/api/quizzes/${quizId}/submit`, { answers }),
  getAnalytics: () => api.get('/api/quizzes/analytics/overview'),
};

// Translation API
export const translationAPI = {
  translate: (translationData) => api.post('/api/translation/translate', translationData),
  getLanguages: () => api.get('/api/translation/languages'),
  translateEducationalContent: (contentData) => api.post('/api/translation/educational-content', contentData),
  translateQuiz: (quizData) => api.post('/api/translation/quiz-translate', quizData),
};

// Admin API
export const adminAPI = {
  // Dashboard stats
  getStats: () => api.get('/api/admin/stats'),

  // User management
  getUsers: () => api.get('/api/admin/users'),
  getUser: (userId) => api.get(`/api/admin/users/${userId}`),
  updateUserRole: (userId, role) => api.put(`/api/admin/users/${userId}/role`, { role }),
  deleteUser: (userId) => api.delete(`/api/admin/users/${userId}`),

  // Quiz management
  getAllQuizzes: () => api.get('/api/admin/quizzes'),
  getQuiz: (quizId) => api.get(`/api/admin/quizzes/${quizId}`),
  deleteQuiz: (quizId) => api.delete(`/api/admin/quizzes/${quizId}`),

  // Learning session management
  getAllSessions: () => api.get('/api/admin/sessions'),
  getSession: (sessionId) => api.get(`/api/admin/sessions/${sessionId}`),
  deleteSession: (sessionId) => api.delete(`/api/admin/sessions/${sessionId}`),
};

export default api;