<template>
      <div class="container">
        <div class="content">
          <div class="register-container">
            <h1>Register</h1>
            <form @submit.prevent="register" class="register-form">
              <div class="form-group">
                <label for="email">Email:</label> <br>
                <input type="email" id="email" v-model="email" placeholder="Email" required />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Password" required />
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" required />
              </div>
              <button type="submit">Register</button>
              <router-link to="/login" class="login-link">Login</router-link>
            </form>
            <p v-if="error" class="error-message">{{ error }}</p>
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
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false,
      };
    },
    methods: {
      register() {
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords do not match';
          return;
        }
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
          this.confirmPassword = '';
  
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

.container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.content {
  width: 202vh;
  padding: 0% 5% 4% 5%;
}

  .register-container {
    max-width: 400px;
    margin-top: 10%;
    margin-left: 40%;
    padding: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.8);
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
    width: 80%;
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
  transition: border-color 0.25s;  }
  
  .login-link:hover {
  border-color: #646cff;
}
.login-link:focus,
.logins-link:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
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
  