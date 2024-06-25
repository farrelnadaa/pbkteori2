import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import router from './router' // Impor router

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'

const myApp = createApp(App)

// Buat instance Pinia
const pinia = createPinia()

// Gunakan Quasar, Pinia, dan Router
myApp.use(Quasar, {
  plugins: {},
})

myApp.use(pinia)
myApp.use(router) // Tambahkan router
myApp.mount('#app')
