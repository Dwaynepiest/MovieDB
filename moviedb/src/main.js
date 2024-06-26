import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'


import Home from './components/home.vue';
import Favorite from './components/favorite.vue'
import Search from './components/search.vue'
import Settings from './components/settings.vue'
import Profile from './components/profile.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/favorite', component: Favorite,  meta: { requiresAuth: true } },
    { path: '/search', component: Search },
    { path: '/settings', component: Settings },
    { path: '/register', component: Register },
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { requiresGuest: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } }, 
    // other routes...
  ],
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');

  if (to.meta.requiresAuth && !loggedInUser) {
    next('/login'); // Redirect to login if trying to access profile without authentication
  } else if (to.meta.requiresGuest && loggedInUser) {
    next('/profile'); // Redirect to profile if trying to access login when already authenticated
  } else {
    next(); // Continue navigation
  }
});



const app = createApp(App)
app.use(router)
app.mount('#app')