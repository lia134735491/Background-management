import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';
Vue.use(ElementTiptapPlugin, { /* 插件配置项 */ lang: 'zh' })

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
