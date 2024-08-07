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
      showAddUserForm: false,
      showDeleteDialog: false,
      userToDelete: null,
      confirmDelete: false
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
      this.editingUser = { ...user };
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
    showDeleteConfirmation(user) {
      this.userToDelete = user;
      this.showDeleteDialog = true;
    },
    hideDeleteConfirmation() {
      this.userToDelete = null;
      this.showDeleteDialog = false;
      this.confirmDelete = false;
    },
    deleteUser() {
      if (!this.userToDelete) return;

      axios.delete(`http://localhost:3000/users/${this.userToDelete.id}`)
        .then(response => {
          this.fetchUsers(); // Refetch users after deletion
          this.hideDeleteConfirmation();
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
  },
  computed: {
    canDelete() {
      return this.confirmDelete;
    }
  }
}
</script>

<template>
      <div class="container">
        <div class="content">
  <div class="panel">
    <div>
    <h1>User Panel</h1>
    <div class="scroll">
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
              <button @click="editUser(user)" >Edit</button>
              <button @click="showDeleteConfirmation(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
    <button @click="showAddUserForm = true"style="float: right; margin-right: 2%;">Add User</button>
  </div>

    <!-- Add user form modal -->
    <div v-if="showAddUserForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showAddUserForm = false">&times;</span>
        <h2>Add New User</h2>
        <form @submit.prevent="addUser" class="modal-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="newUser.email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="newUser.password" required />
          </div>
          <div class="button-group">
            <button type="submit">Add User</button>
            <button type="button" @click="showAddUserForm = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit user form modal -->
    <div v-if="editingUser" class="modal">
      <div class="modal-content">
        <span class="close" @click="cancelEdit">&times;</span>
        <h2>Edit User {{ editingUser.id }}</h2>
        <form @submit.prevent="updateUser" class="modal-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="editingUser.email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="editingUser.password" required />
          </div>
          <div class="button-group">
            <button type="submit">Update User</button>
            <button type="button" @click="cancelEdit">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete confirmation dialog -->
    <div v-if="showDeleteDialog" class="modal">
      <div class="modal-content">
        <h2>Are you sure?</h2>
        <p>This will permanently delete the user and all associated data. This action cannot be undone.</p>
        <label>
          <input type="checkbox" v-model="confirmDelete" />
          I understand that this action is permanent and can't be undone.
        </label>
        <div class="button-group">
          <button @click="deleteUser" :disabled="!canDelete" class="delete-button">Delete</button>
          <button @click="hideDeleteConfirmation" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</div>
</div>
</template>

<style scoped>
.scroll {
  /* background-color: pink; */
  height: 550px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.panel {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 10px;
  margin-top: 3%;
  height: 750px;
}

table {
  /* margin-left:10%; */
  border-collapse: collapse;
  width: 80%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

button {
  margin: 5px;
}

/* Modal styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: rgba(0, 0, 0, 0.8);
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  position: relative;
  text-align: center;
  border-radius: 20px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #040804;
}

button[type="button"] {
  background-color: #f44336;
}

button[type="button"]:hover {
  background-color: #e53935;
}

/* Additional styles for delete confirmation dialog */
.delete-confirmation-dialog .dialog-content {
  background-color: #242424;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.delete-confirmation-dialog h2 {
  margin-bottom: 10px;
}

.delete-confirmation-dialog p {
  margin-bottom: 20px;
}

.delete-confirmation-dialog label {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.delete-confirmation-dialog input[type="checkbox"] {
  margin-right: 10px;
}

.delete-confirmation-dialog .button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.delete-confirmation-dialog .delete-button {
  background-color: #f44336;
}

.delete-confirmation-dialog .delete-button:disabled {
  background-color: #e57373;
}

.delete-confirmation-dialog .cancel-button {
  background-color: #9e9e9e;
}

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
</style>
