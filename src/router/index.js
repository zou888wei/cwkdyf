import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const HomePage = () =>
    import ( /* webpackChunkName: "HomePage" */ "@/views/HomePage")
const home = () =>
    import ( /* webpackChunkName: "home" */ "@/views/home")
const about = () =>
    import ( /* webpackChunkName: "about" */ "@/views/about")
const product = () =>
    import ( /* webpackChunkName: "product" */ "@/views/product")
const productDetail = () =>
    import ( /* webpackChunkName: "productDetail" */ "@/views/productDetail")
const culture = () =>
    import ( /* webpackChunkName: "culture" */ "@/views/culture")
const news = () =>
    import ( /* webpackChunkName: "news" */ "@/views/news")
const link = () =>
    import ( /* webpackChunkName: "link" */ "@/views/link")
const drugMatching = () =>
    import ( /* webpackChunkName: "yaopin" */ "@/views/drugMatching")
const drugMatching18W = () =>
    import ( /* webpackChunkName: "yaopin18" */ "@/views/drugMatching18W")
const drugZyyp = () =>
    import ( /* webpackChunkName: "zyyp" */ "@/views/drugZyyp")


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
        },
        {
            path: '/drugMatching18W',
            name: 'DrugMatching18W',
            component: drugMatching18W
        },
        {
            path: '/drugZyyp',
            name: 'DrugZyyp',
            component: drugZyyp
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