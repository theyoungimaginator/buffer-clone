import { create } from 'zustand';
import axios from '../utils/api';
import { toast } from 'sonner';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true,

  initializeAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        set({ token, isAuthenticated: true });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('/auth/me');
        set({ user: res.data.data, isLoading: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      localStorage.removeItem('token');
      set({ isAuthenticated: false, user: null, token: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ isAuthenticated: true, user, token });
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || 'Login failed. Please try again.');
      return false;
    }
  },

  register: async (username, email, password) => {
    try {
      const res = await axios.post('/auth/register', { username, email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ isAuthenticated: true, user, token });
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Registration error:', error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || 'Registration failed. Please try again.');
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ isAuthenticated: false, user: null, token: null });
    toast.info('You have been logged out.');
  },

  forgotPassword: async (email) => {
    try {
      await axios.post('/auth/forgotpassword', { email });
      toast.success('Password reset link sent to your email.');
      return true;
    } catch (error) {
      console.error('Forgot password error:', error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || 'Failed to send reset link.');
      return false;
    }
  },

  resetPassword: async (token, password) => {
    try {
      await axios.put(`/auth/resetpassword/${token}`, { password });
      toast.success('Your password has been reset successfully!');
      return true;
    } catch (error) {
      console.error('Reset password error:', error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || 'Failed to reset password. Link might be invalid or expired.');
      return false;
    }
  },

  updateUser: (newUser) => {
    set({ user: newUser });
  }
}));

export default useAuthStore;