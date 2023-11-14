import axios from "axios";

const service = axios.create({
  baseURL: 'http://lcoalhost:3000',
  timeout: 30000,
});

service.defaults.headers = {
  "Content-Type": "application/json;charset=utf-8",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

service.interceptors.request.use(
  (config) => {    
    console.log(config.data);
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // console.log("response interceptor");
    // console.log(response);

    return Promise.resolve(response);
  },
  async (error) => {
    return Promise.reject(error);
  }
);


export default service;