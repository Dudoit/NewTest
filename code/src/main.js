import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import JsonExcel from 'vue-json-excel'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

Vue.filter('dateFormat', (originVal) => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.component('downloadExcel', JsonExcel)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
