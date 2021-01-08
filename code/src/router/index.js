import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Subjective from '../components/questions/Subjective.vue'
import Objective from '../components/questions/Objective.vue'
import Text from '../components/questions/Text.vue'
import Img from '../components/questions/Img.vue'
import Add from '../components/questions/Add.vue'
import Voice from '../components/questions/Voice.vue'
import Logger from '../components/logger/Logger.vue'
import Power from '../components/power/Power.vue'
import Powerless from '../components/power/Powerless.vue'
import Excel from '../components/excel/Excel.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/subjective', component: Subjective },
      { path: '/objective', component: Objective },
      { path: '/text', component: Text },
      { path: '/img', component: Img },
      { path: '/img/add', component: Add },
      { path: '/voice', component: Voice },
      { path: '/logger', component: Logger },
      { path: '/power', component: Power },
      { path: '/powerless', component: Powerless },
      { path: '/excel', component: Excel }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫 to将要访问的路径 from从哪个路径跳转而来 next是一个函数 表示放行 next()放行 next('/login')强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
