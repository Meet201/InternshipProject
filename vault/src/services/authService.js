import api from '../utils/api';

export const login = async (credentials) => {
  const response = await api.post('/user/login', credentials);
  if (response.data.error === false) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('loginTime', Date.now().toString());
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('loginTime');
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');
  if (token && loginTime) {
    const timeElapsed = Date.now() - parseInt(loginTime);
    if (timeElapsed > 60 * 60 * 1000) { // 1 hour
      logout();
      return null;
    }
  }
  return token;
};

export const getUser = () => JSON.parse(localStorage.getItem('user'));