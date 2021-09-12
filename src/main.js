import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'// a modern alternative to CSS resets
import Element from 'element-ui'
// 更改一些默认样式
import './stytles/element-ui.scss'
import '@/stytles/index.scss' // global css
// 导入iconfont css
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'
// 导入swipe
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import Cookies from 'js-cookie'
// 导入svg
import './icons'

Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'media' // set element-ui default size
})
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
