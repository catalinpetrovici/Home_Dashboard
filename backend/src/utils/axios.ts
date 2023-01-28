import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const axiosIns = axios.create({
  baseURL: process.env.HOST_NODERED,
});

export default axiosIns;
