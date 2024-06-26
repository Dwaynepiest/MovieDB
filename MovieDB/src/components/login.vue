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
    axios.get('http://localhost:3000/users')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  },
  methods: {
    login() {
      axios.get('http://localhost:3000/users', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        // Handle successful login response
        console.log("Login successful!", response);
        // You can also store the user's token or data in local storage or Vuex
      })
      .catch(error => {
        console.error("Login failed!", error);
      });
    }
  }
};
</script>