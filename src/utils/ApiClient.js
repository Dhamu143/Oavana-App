import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//http://67.207.90.56:3000/api
//https://api.greenearthtoken.com/api
//http://192.168.1.20:3000/api

const apiClient = axios.create({
  baseURL: 'https://api.greenearthtoken.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const deviceId = await AsyncStorage.getItem('deviceId');

      // console.log('apiClient page deviceId', deviceId, token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (deviceId) {
        config.headers['deviceid'] = deviceId;
      }
    } catch (error) {
      console.log('Error fetching auth token or device ID:', error);
    }

    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
      console.log('Session expired, logging out...');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
