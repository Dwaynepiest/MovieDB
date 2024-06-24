import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'


import Home from './components/home.vue';
import Favorite from './components/favorite.vue'
import Search from './components/search.vue'
import Settings from './components/settings.vue'
import Profile from './components/profile.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/favorite', component: Favorite },
    { path: '/search', component: Search },
    { path: '/settings', component: Settings },

    { path: '/profile', component: Profile },
  ]
})


const app = createApp(App)
app.use(router)
app.mount('#app')