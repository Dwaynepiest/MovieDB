<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    <br />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      error: ''
    }
  },
  methods: {
    register() {
      axios.post('localhost:3000/users', {
        username: this.username,
        password: this.password,
        email: this.email
      })
      .then(response => {
        if (response.data.success) {
          // Registration successful, redirect to login or whatever
          console.log('User created successfully');
        } else {
          this.error = response.data.message;
        }
      })
      .catch(error => {
        this.error = error.message || 'An error occurred';
      });
    }
  }
}
</script>