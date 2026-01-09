import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LearningAssistant from './pages/LearningAssistant';
import QuizGenerator from './pages/QuizGenerator';
import QuizTaking from './pages/QuizTaking';
import QuizResults from './pages/QuizResults';
import TranslationTools from './pages/TranslationTools';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminQuizzes from './pages/AdminQuizzes';
import AdminSessions from './pages/AdminSessions';
import AdminTranslation from './pages/AdminTranslation';
import AdminQuizGenerator from './pages/AdminQuizGenerator';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Protected Route component
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

// App Router component
const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning"
          element={
            <ProtectedRoute>
              <LearningAssistant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <QuizGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/translation"
          element={
            <ProtectedRoute>
              <TranslationTools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <ProtectedRoute>
              <QuizTaking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:quizId/results"
          element={
            <ProtectedRoute>
              <QuizResults />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminProtectedRoute>
              <AdminQuizzes />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/sessions"
          element={
            <AdminProtectedRoute>
              <AdminSessions />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/translation"
          element={
            <AdminProtectedRoute>
              <AdminTranslation />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/quiz-generator"
          element={
            <AdminProtectedRoute>
              <AdminQuizGenerator />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

