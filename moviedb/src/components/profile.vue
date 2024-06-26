<template>
    <div class="profile-container" v-if="user">
      <h1>User Profile</h1>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    methods: {
      async fetchUserData() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No token found');
          }
          const response = await axios.get('http://localhost:3000/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = response.data;
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Optionally handle specific errors here (e.g., unauthorized)
        }
      },
    },
    mounted() {
      this.fetchUserData();
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  