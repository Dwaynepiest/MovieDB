<template>
  <div>
    <h1>Users</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
      <br />
      <button type="submit">Login</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        <p>ID: {{ user.id }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Password: {{ user.password }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      email: '',
      password: ''
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:3000/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error("Failed to fetch users!", error);
        });
    },
    login() {
      axios.get('http://localhost:3000/users', {
        params: {
          email: this.email,
          password: this.password
        }
      })
      .then(response => {
        // Assuming response.data is the user object from server
        const user = response.data;
        // Store user data in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        console.log("Login successful!", user);
        // Redirect or perform other actions upon successful login
        this.$router.push('/');
      })
      .catch(error => {
        console.error("Login failed!", error);
      });
    }
  }
};
</script>
