import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import ViewSign from '../components/ViewSign.vue'
import look from '../components/look.vue'
import login from '../components/login.vue'
import index from '../components/index.vue';
import callback from '../components/callback.vue'
import saoma from '../components/saoma.vue'
import QRfail from '../components/QRfail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login,
  },{
    path:'/index',
    component:index,
    children:[{
      path:'/Home',
      component:Home
    },
    {
      path:'/look',
      component:look
    }
    ]
  },
  {
    path:'/callback',
    component:callback,
  },
  {
    path:'/saoma',
    component:saoma,
  },
  {
    path:'/QRfail',
    component:QRfail,
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
      let admin = localStorage.getItem('admin')
      
  if (admin) {
        next('/home')
      } else {
        next()
      }
    }
    else{
      let admin = localStorage.getItem('admin')
        if (!admin) {
          next('/')
        } else {
          next()
        }

    }
})

export default router