import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';
import '@/assets/css/index.css';

const app = createApp(App);

app.use(ElementPlus);

app
  .use(store)
  .use(router)
  .mount('#app');
