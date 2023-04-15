import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { provide } from './primary/infrastructure/dependency-injection';
import App from './App.vue';

const app = createApp(App);

provide(app);
app.use(ElementPlus).mount('#app');
