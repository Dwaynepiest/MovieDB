<script>
import axios from 'axios'; // Import axios for HTTP requests
import ResetPasswordPopup from './ResetPasswordPopup.vue'; // Import the ResetPasswordPopup component

export default {
  // Register the ResetPasswordPopup component
  components: { ResetPasswordPopup },

  // Define component data
  data() {
    return {
      user: null, // Store user data
      showDeleteDialog: false, // Control visibility of the delete confirmation dialog
      confirmDelete: false, // Confirmation status for account deletion
      showResetPasswordPopup: false // Control visibility of the reset password popup
    };
  },

  // Fetch user data when the component is mounted
  mounted() {
    this.fetchUserData();
  },

  // Define computed properties
  computed: {
    // Determine if account deletion is confirmed
    canDelete() {
      return this.confirmDelete;
    },

    // Format the account creation date
    formattedDate() {
      const date = new Date(this.user.created_at);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },

    // Format the account creation time
    formattedTime() {
      const date = new Date(this.user.created_at);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    },

    // Check if the user is an admin
    isAdmin() {
      console.log('isAdmin computed property called');
      console.log('this.user:', this.user);
      return this.user.is_admin === 1;
    }
  },

  // Define component methods
  methods: {
    // Fetch user data from session storage
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

    // Log out the user
    logout() {
      sessionStorage.removeItem('loggedInUser'); // Clear session storage
      this.$router.push('/login'); // Redirect to login page
    },

    // Show the delete confirmation dialog
    showDeleteConfirmation() {
      this.showDeleteDialog = true;
    },

    // Hide the delete confirmation dialog
    hideDeleteConfirmation() {
      this.showDeleteDialog = false;
    },

    // Delete the user account
    deleteAccount() {
      const userId = this.user.id;
      axios.delete(`http://localhost:3000/users/${userId}`)
        .then(response => {
          console.log(response.data.message);
          sessionStorage.removeItem('loggedInUser'); // Remove user data from session storage
          this.$router.push('/login'); // Redirect to login page
        })
        .catch(error => {
          console.error(error.response.data.error);
        });
      this.hideDeleteConfirmation(); // Hide the delete confirmation dialog
    }
  }
};
</script>
<template>
  <!-- Main container for the profile page -->
  <div class="container">
    <!-- Content container to center the profile information -->
    <div class="content">
      <!-- Profile container, visible if user data is available -->
      <div class="profile-container" v-if="user">
        <h1 class="title">User Profile</h1>
        <!-- Display admin message if the user is an admin -->
        <p v-if="isAdmin" class="admin-msg">YOU'RE AN ADMIN</p>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <!-- Display account creation date and time -->
        <p class="title"><strong>Created at:</strong></p>
        <span>Date: {{ formattedDate }}</span>  <span>Time: {{ formattedTime }}</span> <br><br>
        <!-- Buttons for user actions -->
        <div class="buttons">
          <button v-if="isAdmin" @click="$router.push('/UserPanel')">User Panel</button>
          <button @click="showDeleteConfirmation" class="delete-button">Delete Account</button>
          <button @click="showResetPasswordPopup = true">Reset Password</button>
          <button @click="logout" class="logout-btn">Logout</button> <br>
        </div>
        <!-- Include ResetPasswordPopup component -->
        <ResetPasswordPopup :show="showResetPasswordPopup" :userId="user.id" @close="showResetPasswordPopup = false" />

        <!-- Delete confirmation dialog -->
        <div v-if="showDeleteDialog" class="delete-confirmation-dialog">
          <div class="dialog-content">
            <h2>Are you sure?</h2>
            <p>This will permanently delete your account and all associated data. This action cannot be undone.</p>
            <label>
              <input type="checkbox" v-model="confirmDelete" />
              I understand that this action is permanent and can't be undone.<br>
            </label>
            <button @click="deleteAccount" :disabled="!canDelete" class="delete-button">Delete</button>
            <button @click="hideDeleteConfirmation" class="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
      <!-- Display message if not logged in -->
      <div v-else>
        <p>Not logged in</p>
      </div>
    </div>
  </div>
</template>

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

/* Profile container styling */
.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 25px;
  margin: 5% auto;
}

/* Admin message styling */
.admin-msg {
  color: grey;
  font-size: 15px;
  margin: 0;
}

/* Title styling */
.title {
  margin: 10px 0px 0px 0px;
}

/* Button styling */
.logout-btn,
.delete-button,
.cancel-button {
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Ensure buttons take full width on smaller screens */
  max-width: 300px;
  margin: 5px auto; /* Center buttons */
}

/* Logout button styling */
.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.logout-btn:hover {
  background-color: #c82333;
}

/* Delete button styling */
.delete-button {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
}

.delete-button:hover {
  background-color: #cc0000;
}

/* Cancel button styling */
.cancel-button {
  background-color: #999999;
  color: #ffffff;
  border: none;
}

.cancel-button:hover {
  background-color: #777777;
}

/* Delete confirmation dialog styling */
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

/* Dialog content styling */
.dialog-content {
  background-color: #242424;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: left;
}

/* Button container styling */
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center; /* Center buttons */
  padding: 10px;
  margin-bottom: 0;
}

.buttons button {
  flex: 1 1 auto;
  min-width: 150px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  margin: 5px;
}

/* Responsive styling for smaller screens */
@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
    margin: 10% auto;
  }

  .buttons button {
    font-size: 14px;
    padding: 8px 16px;
  }

  .logout-btn,
  .delete-button,
  .cancel-button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>
