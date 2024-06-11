import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/home.vue'
import About from './components/about.vue'
import Contact from './components/contact.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
  ]
})


const app = createApp(App)
app.use(router)
app.mount('#app')