<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Register</button>
        <router-link to="/login" class="login-link">Login</router-link>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="success" class="success-message">Registration successful! You are now logged in.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
        success: false,
      };
    },
    methods: {
      register() {
        axios.post('http://localhost:3000/users', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          // Store user data in session storage
          sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
          console.log("Registration and login successful!", response.data);
  
          // Indicate success and reset form fields
          this.success = true;
          this.error = '';
          this.email = '';
          this.password = '';
  
          // Redirect to the desired page after registration and login
          this.$router.push('/');
        })
        .catch(error => {
          this.error = error.response.data.message || 'Registration Failed';
          this.success = false;
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #040405;
  }
  
  .login-link {
    text-align: center;
    margin-top: 10px;
    display: block;
    text-decoration: none;
    color: #007bff;
    font-size: 16px;
  }
  
  .login-link:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  
  .success-message {
    color: green;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  