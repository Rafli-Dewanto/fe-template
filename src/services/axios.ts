import { FIVE_SECONDS } from '@/constants';
import { newAbortSignal } from '@/utils/api';
import Axios from 'axios';

const baseURL = 'http://localhost:9500/api';
const axios = Axios.create({
  baseURL,
  signal: newAbortSignal(FIVE_SECONDS),
});

export default axios;