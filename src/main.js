import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BButton from './components/BButton.vue'
import './assets/main.scss'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('BButton', BButton)
app.mount('#app')
