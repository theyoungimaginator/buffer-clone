import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import LandingPage from './pages/LandingPage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Scheduler from './pages/Scheduler';
import Posts from './pages/Posts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'sonner';
import useAuthStore from './store/authStore';

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Dashboard Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="scheduler" element={<Scheduler />} />
              <Route path="posts" element={<Posts />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;