import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router'
import App from './App.vue'
import { inject } from '@vercel/analytics'

import './css/style.css'


inject()

const app = createApp(App)
app.use(createPinia());
app.use(router)
app.mount('#app')
