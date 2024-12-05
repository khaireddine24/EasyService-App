import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

const API_URL = "https://easyservice-app-1.onrender.com";
// const API_URL = "http://localhost:5000";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Base Authentication State
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      service:null,

      // Authentication Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/login`, { 
            email, 
            password 
          }, { 
            withCredentials: true 
          });

          set({
            user: {
              firstName: response.data.firstName,
              lastName: response.data.lastName,
            },
            accessToken: response.data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Login error'
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/register`, userData, {
            withCredentials: true
          });

          set({
            user: {
              firstName: response.data.first_name,
              lastName: response.data.last_name,
              email: response.data.email,
              role: response.data.role
            },
            accessToken: response.data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Registration error'
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true
          });

          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Logout error'
          });
          throw error;
        }
      },

      // Forgot Password Actions
      sendResetOTP: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/sendReset`, { email });
          set({ isLoading: false, error: null });
          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Error sending OTP'
          });
          throw error;
        }
      },

      verifyResetOTP: async (email, otp) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/verifyOtp`, { email, otp });
          set({ isLoading: false, error: null });
          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Error verifying OTP'
          });
          throw error;
        }
      },

      resetPassword: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/reset`, { email, password });
          set({ isLoading: false, error: null });
          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Password reset error'
          });
          throw error;
        }
      },

      refreshToken: async () => {
        try {
          const response = await axios.get(`${API_URL}/auth/refresh`, {
            withCredentials: true
          });

          set({ 
            accessToken: response.data.accessToken,
            isAuthenticated: true 
          });

          return response.data.accessToken;
        } catch (error) {
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false
          });
          throw error;
        }
      },
      updateService:async(email, services)=>{
        set({ isLoading: true, error: null});
        try{
          const response = await axios.post(`${API_URL}/prestataire/update-service`, { email, services });
          set({ isLoading: false, error: null, service: null });
          return response.data;
        } catch(error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Service or Email Not Found' 
          });
          throw error;
        }
      },

      // Utility Action
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore;