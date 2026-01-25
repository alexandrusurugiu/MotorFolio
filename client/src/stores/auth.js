import { defineStore } from "pinia";
import axios from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user ? state.user.name : 'User'
  },
  actions: {
    async loginWithGoogleToken(firebaseToken) {
      try {
        const response = await axios.post('/server/auth/verify-token', {
          token: firebaseToken
        });

        this.user = response.data.user;
        this.token = firebaseToken;

        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);

        router.push('/maintenance');
      } catch (error) {
        console.error('Login failed: ', error);
      }
    },

    logOut() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      router.push('/');
    }
  }
});