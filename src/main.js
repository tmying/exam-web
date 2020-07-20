/* 入口文件(清单) */
// 全局模块
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; //引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 全局配置
Vue.config.productionTip = false
Vue.use(ElementUI);

import 'normalize.css'; //重置样式
import './assets/common.less'; //自定义全局样式

new Vue({
  router,
  store, //注册全局仓库
  render: h => h(App)
}).$mount('#app')
