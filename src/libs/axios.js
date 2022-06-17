import Vue from "vue";

// axios
import axios from "axios";

let apiUrl = "http://localhost:3001";

const axiosIns = axios.create({
  // You can add your headers here
  // ================================

  baseURL: apiUrl,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

Vue.prototype.$http = axiosIns;

export default axiosIns;
