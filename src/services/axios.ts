import Axios from "axios";

import { FIVE_SECONDS } from "@/constants";
import { newAbortSignal } from "@/utils/api";

const baseURL = "http://localhost:9500/api";
const axios = Axios.create({
  baseURL,
  signal: newAbortSignal(FIVE_SECONDS),
});

export default axios;
