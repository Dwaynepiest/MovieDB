<template>
    <div class="profile-container" v-if="user">
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
    <div v-else>
      <p>Not logged in</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: null,
      };
    },
    mounted() {
      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (storedUser) {
          this.user = {
            id: storedUser.id,
            email: storedUser.email,
          };
        } else {
          console.error('No user data found in session storage.');
          // Optionally handle this case, e.g., redirect to login page
        }
      },
      logout() {
        // Clear session storage
        sessionStorage.removeItem('loggedInUser');
        // Redirect to login page
        this.$router.push('/login'); // Adjust route as per your application setup
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  
  .profile-container h1 {
    margin-bottom: 20px;
  }
  
  .profile-container p {
    margin-bottom: 10px;
  }
  
  .logout-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .logout-btn:hover {
    background-color: #c82333;
  }
  
  </style>
  
