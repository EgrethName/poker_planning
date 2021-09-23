import { createApp } from 'vue';
import {
  Button, Form, Input, Tabs, Modal, Tooltip,
} from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/index.css';

const app = createApp(App);

app
  .use(Button)
  .use(Form)
  .use(Input)
  .use(Tabs)
  .use(Modal)
  .use(Tooltip);

app
  .use(store)
  .use(router)
  .mount('#app');
