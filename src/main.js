import Vue from 'vue'
import store from './store'
import router from './router'
import App from './components/App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
 