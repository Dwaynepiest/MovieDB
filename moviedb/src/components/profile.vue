<template>
  <div class="profile-container" v-if="user">
    <h1>User Profile</h1>
    <p v-if="isAdmin">YOU'RE AN ADMIN</p>
    <p><strong>ID:</strong> {{ user.id }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Created at:</strong> </p>
    <div> <span>Date: {{ formattedDate }}</span>  <br>  <span>Time: {{ formattedTime }}</span> </div>
    <button v-if="isAdmin" @click="$router.push('/UserPanel')">Go to User Panel</button>
    <button @click="logout" class="logout-btn">Logout</button> <br>
    <button @click="showDeleteConfirmation" class="delete-button">Delete Account</button>
    <button @click="showResetPasswordPopup = true">Reset Password</button>

    <ResetPasswordPopup :show="showResetPasswordPopup" :userId="user.id" @close="showResetPasswordPopup = false" />

    <!-- Delete confirmation dialog -->
    <div v-if="showDeleteDialog" class="delete-confirmation-dialog">
      <div class="dialog-content">
        <h2>Are you sure?</h2>
        <p>This will permanently delete your account and all associated data. This action cannot be undone.</p>
        <label>
          <input type="checkbox" v-model="confirmDelete" />
          I understand that this action is permanent and can't be undone.
        </label>
        <button @click="deleteAccount" :disabled="!canDelete" class="delete-button">Delete</button>
        <button @click="hideDeleteConfirmation" class="cancel-button">Cancel</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Not logged in</p>
  </div>
</template>

<script>
import axios from 'axios';
import ResetPasswordPopup from './ResetPasswordPopup.vue';

export default {
  components: { ResetPasswordPopup },
  data() {
    return {
      user: null,
      showDeleteDialog: false,
      confirmDelete: false,
      showResetPasswordPopup: false
    };
  },
  mounted() {
    this.fetchUserData();
  },
  computed: {
    canDelete() {
      return this.confirmDelete;
    },
    formattedDate() {
      const date = new Date(this.user.created_at);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    formattedTime() {
      const date = new Date(this.user.created_at);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    },
    isAdmin() {
      console.log('isAdmin computed property called');
      console.log('this.user:', this.user);
      return this.user.is_admin === 1;
      }
  },
  methods: {
    fetchUserData() {
      const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
      if (storedUser) {
        this.user = {
          id: storedUser.id,
          email: storedUser.email,
          created_at: storedUser.created_at,
          is_admin: storedUser.is_admin
        };
      } else {
        console.error('No user data found in session storage.');
        // Optionally handle this case, e.g., redirect to login page
      }
    },
    logout() {
      // Clear session storage
      sessionStorage.removeItem('loggedInUser');
      // Redirect to login page
      this.$router.push('/login'); // Adjust route as per your application setup
    },
    showDeleteConfirmation() {
      this.showDeleteDialog = true;
    },
    hideDeleteConfirmation() {
      this.showDeleteDialog = false;
    },
    deleteAccount() {
      const userId = this.user.id;
      // Send delete request to API
      axios.delete(`http://localhost:3000/users/${userId}`)
        .then(response => {
          console.log(response.data.message);
          // Remove user data from session storage
          sessionStorage.removeItem('loggedInUser');
          // Redirect to login page
          this.$router.push('/login');
        })
        .catch(error => {
          console.error(error.response.data.error);
        });
      this.hideDeleteConfirmation();
    }
  }
};
</script>


<style scoped>
.profile-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.profile-container h1 {
  margin-bottom: 20px;
}

.profile-container p {
  margin-bottom: 10px;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c82333;
}

.delete-button {
  margin-top:3%;
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #cc0000;
}

.delete-confirmation-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background-color: #242424;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.cancel-button {
  background-color: #999999;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 2% ;
}

.cancel-button:hover {
  background-color: #777777;
}
</style>