import  { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const APP = createApp(App)

APP.use(router)

APP.mount('#app')
