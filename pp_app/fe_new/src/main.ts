import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/index.css';

const app = createApp(App);

app.use(Antd);

app
  .use(store)
  .use(router)
  .mount('#app');
