import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import './axios.config'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/**
 * 创建axios实例
 */
const service = axios.create({
  timeout: 3000,
  baseURL: 'https://api.hnyequ.cn'
})

/**
 * req请求拦截
 */
service.interceptors.request.use((config: object): object => {
  return config
}, (error: any): object => {
  return Promise.reject(error)
})

/**
 * res 拦截器
 */
service.interceptors.response.use((response: any) => {
  const res = response.data
  if (res.error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(res)
    }
    return Promise.reject(res)
  }
  return Promise.resolve(res)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// main.ts文件
router.beforeEach((to: any, from: any, next: any) => {
  if (to.name === 'login') {
    next({name: 'home/index'})
  } else {
    next()
  }
})
