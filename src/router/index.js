import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const HomePage = resolve => require(['../views/HomePage'], resolve)
const home = resolve => require(['../views/home'], resolve)
const about = resolve => require(['../views/about'], resolve)
const product = resolve => require(['../views/product'], resolve)
const productDetail = resolve => require(['../views/productDetail'], resolve)
const culture = resolve => require(['../views/culture'], resolve)
const news = () => import(/* webpackChunkName: "news" */ "@/views/news")
const link = resolve => require(['../views/link'], resolve)
const drugMatching = () => import(/* webpackChunkName: "yaopin" */ "@/views/drugMatching")

    
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            component: HomePage,
            children: [{
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
        },
        {
            path: '/drugMatching',
            name: 'DrugMatching',
            component: drugMatching
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        next('/home')
    } else {
        next()
    }
})

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
      router.replace(targetPath);
    }
  });

export default router;