<template>
    <div>
      <h1>Users</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          <p>ID: {{ user.id }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Password: {{ user.password }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: []
      };
    },
    mounted() {
      axios.get('http://localhost:3000/users')
        .then(response => {
          this.users = response.data; // Assuming the response is an array of user objects
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  };
  </script>
  
  