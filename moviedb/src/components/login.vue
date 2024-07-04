<template>
    <div class="container">
      <div class="content">
        <div class="login-container">
          <h1>Login</h1>
          <form @submit.prevent="login" class="login-form">
            <div class="form-group">
              <label for="email">Email:</label> <br>
              <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
              <label for="password">Password:</label> <br>
              <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
            </div>
            <button type="submit">Login</button>
            <router-link to="/register" class="register-link">Register</router-link>
          </form>
          <p v-if="error" class="error-message">{{ error }}</p>
        </div>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        email: '',
        password: '',
        error: ''
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
          const user = response.data.find(u => u.email === this.email);
          const pw = response.data.find(u => u.password === this.password);
          if (!user) {
            throw new Error('User not found');
          }
          if (!pw) {
            throw new Error('Incorrect password');
          }
          // Store user data in session storage
          sessionStorage.setItem('loggedInUser', JSON.stringify(user));
          console.log("Login successful!", user);
          // Redirect or perform other actions upon successful login
          this.$router.push('/');
        })
        .catch(error => {
          this.error = error.message || 'Login Failed'; // Set the error message
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

  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    align-items: center;
    margin-top: 10%;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-form {
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

  .register-link {
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
  
  .register-link:hover {
  border-color: #646cff;
}
.register-link:focus,
.register-link:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>