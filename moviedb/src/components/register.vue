<template>
  <!-- Main container for the registration page -->
  <div class="container">
    <!-- Content container to center the form -->
    <div class="content">
      <!-- Registration form container -->
      <div class="register-container">
        <h1>Register</h1>
        <!-- Form with submit handler 'register' -->
        <form @submit.prevent="register" class="register-form">
          <!-- Email input field -->
          <div class="form-group">
            <label for="email">Email:</label> <br>
            <input type="email" id="email" v-model="email" placeholder="Email" required />
          </div>
          <!-- Password input field -->
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Password" required />
          </div>
          <!-- Confirm Password input field -->
          <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" required />
          </div>
          <!-- Register button -->
          <button type="submit">Register</button>
          <!-- Link to login page -->
          <router-link to="/login" class="login-link">Login</router-link>
        </form>
        <!-- Error message display -->
        <p v-if="error" class="error-message">{{ error }}</p>
        <!-- Success message display -->
        <p v-if="success" class="success-message">Registration successful! You are now logged in.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',          // Email entered by the user
      password: '',       // Password entered by the user
      confirmPassword: '', // Confirmation of the password
      error: '',          // Error message to display
      success: false,     // Success status
    };
  },
  methods: {
    register() {
      // Check if password and confirm password match
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }
      // Make a POST request to register the user
      axios.post('http://localhost:3000/users', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        // Store user data in session storage upon successful registration
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
        console.log("Registration and login successful!", response.data);

        // Indicate success and reset form fields
        this.success = true;
        this.error = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        // Redirect to the home page after registration and login
        this.$router.push('/');
      })
      .catch(error => {
        // Handle errors during registration
        this.error = error.response.data.message || 'Registration Failed';
        this.success = false;
      });
    }
  }
};
</script>

<style scoped>
/* Container for the page, making it fill the viewport */
.container {
  position: relative;
  z-index: 1;
  height: 100vh;
  width: 202vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar for Chrome, Safari, Opera */
.container::-webkit-scrollbar {
  display: none;
}

/* Content area styling */
.content {
  width: 202vh;
  padding: 0% 5% 4% 5%;
}

/* Styling for the registration container */
.register-container {
  max-width: 400px;
  margin-top: 10%;
  margin-left: 40%;
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.8);
}

/* Center the heading */
h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Flex column layout for the form */
.register-form {
  display: flex;
  flex-direction: column;
}

/* Margin for form groups */
.form-group {
  margin-bottom: 10px;
}

/* Bold labels */
label {
  font-weight: bold;
}

/* Styling for input fields */
input[type="email"],
input[type="password"] {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Hover effect for the button */
button:hover {
  background-color: #040405;
}

/* Styling for the login link */
.login-link {
  text-align: center;
  justify-content: center;
  margin-top: 1%;
  display: flex;  
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

/* Hover effect for the login link */
.login-link:hover {
  border-color: #646cff;
}

/* Focus styling for accessibility */
.login-link:focus,
.logins-link:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

/* Error message styling */
.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

/* Success message styling */
.success-message {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
