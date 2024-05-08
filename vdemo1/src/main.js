import { createApp } from 'vue'
// import Vue from 'vue';
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './router'
import store from './store'


// import conf from './config/config.js';
// import utils from './utils/index.js';
// import Plugin from './plugins';
// import VueXss from 'vue-xss';
// Vue.use(VueXss);
// Vue.prototype.conf = conf;
// Vue.prototype.utils = utils;
// Vue.config.productionTip = false;
// Vue.prototype.$bus = new Vue();
// Vue.use(Plugin);
// Vue.use(Antd);

// if (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
//     const cookie = '';
//     cookie.split(';').forEach(item => {
//         document.cookie = item.trim();
//     });
// }

const app = createApp(App);

app.use(store).use(router).use(Antd).mount('#app')
