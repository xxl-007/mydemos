import { createApp } from 'vue'
import App from './App.vue'
// https://www.antdv.com/docs/vue/getting-started-cn
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App);

app.use(store).use(router).use(Antd).mount('#app')
