import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'// a modern alternative to CSS resets
import Element from 'element-ui'
// 更改一些默认样式
import './styles/element-ui.scss'
import '@/styles/index.scss' // global css
// 导入iconfont css
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'
// 导入swipe
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import Cookies from 'js-cookie'
// 导入svg
import './icons'

// 路由拦截
import './permission'

// 导入store
import store from './store/index'
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'media' // set element-ui default size
})
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
