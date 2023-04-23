import { createApp } from 'vue';

import 'material-icons/iconfont/material-icons.css';

import { provide } from './primary/infrastructure/dependency-injection';
import App from './App.vue';

const app = createApp(App);

provide(app);
app.mount('#app');
