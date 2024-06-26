  <template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Login</button>
        <router-link to="/register" class="register-link">Register</router-link>
      </form>
      <ul v-if="users.length > 0" class="user-list">
        <li v-for="user in users" :key="user.id" class="user-item">
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Password:</strong> {{ user.password }}</p>
        </li>
      </ul>
      <p v-else class="no-users">No users found.</p>
    </div>
  </template>

  <script>
  import axios from 'axios';

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
          const user = response.data.find(u => u.email === this.email);
          if (!user) {
            throw new Error('User not found');
          }
          // Store user data in session storage
          sessionStorage.setItem('loggedInUser', JSON.stringify(user));
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
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
  width: 100%;
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
  margin-top: 10px;
  display: block;
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
}

.register-link:hover {
  text-decoration: underline;
}

</style>
