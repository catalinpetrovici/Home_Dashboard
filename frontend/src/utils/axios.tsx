import axios from 'axios';

const axiosIns = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_HOST,
});

export default axiosIns;
