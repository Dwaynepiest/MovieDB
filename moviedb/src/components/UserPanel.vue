<template>
  <div>
    <h1>User Panel</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Password</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>
            <div>
              <span>Date: {{ formattedDate(user.created_at) }}</span>
              <br>
              <span>Time: {{ formattedTime(user.created_at) }}</span>
            </div>
          </td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="showAddUserForm = true">Add User</button>
    <div v-if="showAddUserForm">
      <h2>Add New User</h2>
      <form @submit.prevent="addUser">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newUser.email" required />
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="newUser.password" required />
        <br>
        <button type="submit">Add User</button>
        <button @click="showAddUserForm = false">Cancel</button>
      </form>
    </div>

    <!-- Edit user form -->
    <div v-if="editingUser">
      <h2>Edit User {{ editingUser.id }}</h2>
      <form @submit.prevent="updateUser">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editingUser.email" required />
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="editingUser.password" required />
        <br>
        <button type="submit">Update User</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      newUser: {
        email: '',
        password: ''
      },
      editingUser: null,
      showAddUserForm: false
    }
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
    formattedDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    formattedTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    },
    editUser(user) {
      this.editingUser = user;
    },
    cancelEdit() {
      this.editingUser = null;
    },
    updateUser() {
      axios.patch(`http://localhost:3000/users/${this.editingUser.id}`, {
        email: this.editingUser.email,
        password: this.editingUser.password
      })
     .then(response => {
          this.fetchUsers(); // Refetch users after update
          this.editingUser = null;
        })
     .catch(error => {
          console.error("Failed to update user!", error);
        });
    },
    deleteUser(userId) {
      axios.delete(`http://localhost:3000/users/${userId}`)
     .then(response => {
          this.fetchUsers(); // Refetch users after deletion
        })
     .catch(error => {
          console.error("Failed to delete user!", error);
        });
    },
    addUser() {
      axios.post('http://localhost:3000/users', this.newUser)
     .then(response => {
          this.fetchUsers(); // Refetch users after addition
          this.newUser.email = '';
          this.newUser.password = '';
          this.showAddUserForm = false;
        })
     .catch(error => {
          console.error("Failed to add user!", error);
        });
    }
  }
}

</script>
  
  <style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  </style>