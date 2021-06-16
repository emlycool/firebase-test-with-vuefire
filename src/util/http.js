import axios from 'axios'
import {clientLogout} from './auth'
import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// const http =  axios.create({
//     baseURL: "http://laravel-vue-spa-sanctum-auth.com/"
// });
const http = axios
http.defaults.baseURL = process.env.VUE_APP_API_URL
http.defaults.withCredentials = false


  http.interceptors.request.use( function (config){

    // Do something before request is sent
    const token = store.state.user.token
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    NProgress.start();
    
    return config;
  }, function (error){
    return Promise.reject(error)
  })

  http.interceptors.response.use(function (response) {
    // Do something before request is sent
    NProgress.done();
    return response;
  }, function (error) {
    NProgress.done();
    // Do something with request error
    const originalRequest = error.config;

    
    if(error.response.status === 401){
      if (originalRequest.url === "/api/v1/auth/login") {
        return Promise.reject(error);
      }

      if (originalRequest.url === "/api/v1/auth/refresh"
      ) {
        store.dispatch('logout') 
        return Promise.reject(error);
      }
  
      if (!originalRequest._retry && store.getters.isAuthenticated) {
        originalRequest._retry = true;
        return http.post('/api/v1/auth/refresh', {refresh_token: store.state.user.token})
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.token;
            store.dispatch('refreshToken', {token: token})
            
            http.defaults.headers.common["Authorization"] = "Bearer " + token;
            return http(originalRequest);
          }
        });
  
      }
      
      store.dispatch('logout', {redirectIntended: true})
      return Promise.reject(error)
    }

    if(error.response.status === 404){
		    router.push({name: 'NotFound'})
    }
    return Promise.reject(error)
  });



export default http