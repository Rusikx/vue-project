import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import AuthService from './../../../api/services/auth';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };


export const useAuthModuleStore = defineStore('auth', () => {
  const status = computed(() => {
    return { loggedIn: false }
  });
  const user = ref(null);

  const login = (user) => {
    return AuthService.login(user).then(
      user => {
        loginSuccess(user);
        return Promise.resolve(user);
      },
      error => {
        loginFailure();
        return Promise.reject(error);
      }
    );
  };

  const logout = () => {
    AuthService.logout();
    logoutSet();
  };

  const register = (user) => {
    return AuthService.register(user).then(
      response => {
        registerSuccess();
        return Promise.resolve(response.data);
      },
      error => {
        registerFailure();
        return Promise.reject(error);
      }
    );
  };

  const loginSuccess = (data) => {
    status.value.loggedIn = true;
    user.value = data;
  };

  const loginFailure = () => {
    status.value.loggedIn = false;
    user.value = null;
  };

  const logoutSet = () => {
    status.loggedIn = false;
    user.value = null;
  };

  const registerSuccess = () => {
    status.value.loggedIn = false;
  };

  const registerFailure = () => {
    status.value.loggedIn = false;
  };

  return { user, status, login, logout, register, loginSuccess, loginFailure, logoutSet, registerSuccess, registerFailure }
});