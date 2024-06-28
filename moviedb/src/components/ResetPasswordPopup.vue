<template>
    <div class="popup" v-if="show">
      <div class="popup-content">
        <h2>Reset Password</h2>
        <form @submit.prevent="resetPassword">
          <label>Current Password:</label>
          <input type="password" v-model="currentPassword" />
          <br />
          <label>New Password:</label>
          <input type="password" v-model="newPassword" />
          <br />
          <label>Confirm New Password:</label>
          <input type="password" v-model="confirmNewPassword" />
          <br />
          <p v-if="error" style="color: red">{{ error }}</p>
          <button type="submit">Reset Password</button>
          <button @click="$emit('close')">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    props: {
      show: Boolean
    },
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: ''
      }
    },
    methods: {
      resetPassword() {
        if (this.newPassword !== this.confirmNewPassword) {
          this.error = 'New password and confirm new password do not match';
          return;
        }
        // Call API to reset password
        axios.post('http://localhost:3000/users/', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        })
        .then(response => {
          this.error = '';
          this.$emit('close');
          // Show success message or redirect to login page
        })
        .catch(error => {
          this.error = 'Failed to reset password';
        });
      }
    }
  }
  </script>
  
  <style scoped>
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
  
  .popup-content {
    border-radius: 5%;
    background-color: #242424;
    padding: 20px;
    border: 1px solid #888;
    width: 15%;
    padding: 5%;
    margin: 40px auto;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
  }
  
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #3e8e41;
  }
  
  button[type="button"] {
    background-color: #ccc;
    color: #333;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="button"]:hover {
    background-color: #bbb;
  }
  </style>