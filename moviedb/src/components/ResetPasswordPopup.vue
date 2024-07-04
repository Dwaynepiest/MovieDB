<template>
  <!-- Popup div, visible only when 'show' prop is true -->
  <div class="popup" v-if="show">
    <div class="popup-content">
      <h2>Reset Password</h2>
      <!-- Form to handle password reset, prevents default form submission -->
      <form @submit.prevent="resetPassword">
        <label>Old Password:</label>
        <!-- Input field for old password, bound to 'oldPassword' data -->
        <input type="password" v-model="oldPassword" />
        <br />
        <label>New Password:</label>
        <!-- Input field for new password, bound to 'newPassword' data -->
        <input type="password" v-model="newPassword" />
        <br />
        <label>Confirm New Password:</label>
        <!-- Input field to confirm new password, bound to 'confirmNewPassword' data -->
        <input type="password" v-model="confirmNewPassword" />
        <br />
        <!-- Display error message if 'error' data is not empty -->
        <p v-if="error" style="color: red">{{ error }}</p>
        <!-- Button to submit the form and reset the password -->
        <button type="submit">Reset Password</button>
        <!-- Button to cancel and close the popup, emits 'close' event -->
        <button @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    show: Boolean, // Boolean prop to control visibility of the popup
    userId: {
      type: Number,
      required: true // Required prop to specify the user ID
    }
  },
  data() {
    return {
      oldPassword: '', // Data property to store old password
      newPassword: '', // Data property to store new password
      confirmNewPassword: '', // Data property to store confirmed new password
      error: '' // Data property to store error messages
    };
  },
  methods: {
    resetPassword() {
      // Check if new password and confirm new password match
      if (this.newPassword !== this.confirmNewPassword) {
        this.error = 'New password and confirm new password do not match';
        return;
      }

      // Call API to reset password, passing both old and new passwords
      axios.put(`http://localhost:3000/users/${this.userId}`, {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
      .then(response => {
        this.error = ''; // Clear any error messages
        this.$emit('close'); // Emit 'close' event to close the popup
        // Show success message or redirect to login page
      })
      .catch(error => {
        // Set error message if API call fails
        this.error = error.response?.data?.error || 'Failed to reset password';
      });
    }
  }
};
</script>

<style scoped>
/* Style for the popup container */
.popup {
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

/* Style for the popup content */
.popup-content {
  border-radius: 5%;
  background-color: #242424;
  padding: 20px;
  border: 1px solid #888;
  width: 15%;
  padding: 5%;
  margin: 40px auto;
}

/* Style for the labels */
label {
  display: block;
  margin-bottom: 10px;
}

/* Style for the password input fields */
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

/* Style for the submit button */
button[type="submit"] {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Style for the submit button on hover */
button[type="submit"]:hover {
  background-color: #3e8e41;
}

/* Style for the cancel button */
button[type="button"] {
  background-color: #ccc;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Style for the cancel button on hover */
button[type="button"]:hover {
  background-color: #bbb;
}
</style>
