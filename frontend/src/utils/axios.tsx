import axios from 'axios';

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST,
});

export default axiosIns;
