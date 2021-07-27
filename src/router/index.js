import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const HomePage = () => import('../views/HomePage')
const home = () => import('../views/home')
const about = () => import('../views/about')
const product = () => import('../views/product')
const productDetail = () => import('../views/productDetail')
const culture = () => import('../views/culture')
const news = () => import('../views/news')
const link = () => import('../views/link')


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
      path: '/',
      component: HomePage,
      children:[
        {
          path: '/home',
          name: 'Home',
          component: home
        },
        {
          path: '/about',
          name: 'About',
          component: about
        },
        {
          path: '/home',
          name: 'Home',
          component: home
        },
        {
          path: '/product',
          name: 'Product',
          component: product,
        },
        {
          path: '/productDetail/:id/:name',
          name: 'ProductDetail',
          component: productDetail,
        },
        {
          path: '/culture',
          name: 'Culture',
          component: culture
        },
        {
          path: '/news',
          name: 'News',
          component: news
        },
        {
          path: '/link',
          name: 'Link',
          component: link
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.path == '/'){
    next('/home')
  }else{
    next()
  }
})

export default router;
