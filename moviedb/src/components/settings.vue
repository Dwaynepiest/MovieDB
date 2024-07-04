<template>
  <div class="settings">
    <h1>Settings</h1>
    <div>
      <label for="genres-url">Genres API URL:</label>
      <input type="text" id="genres-url" v-model="genresUrl" />
    </div>
    <div>
      <label for="movietypes-url">Movietypes API URL:</label>
      <input type="text" id="movietypes-url" v-model="movietypesUrl" />
    </div>
    <div>
      <label for="favorites-url">Favorites API URL:</label>
      <input type="text" id="favorites-url" v-model="favoritesUrl" />
    </div>
    <div>
      <label for="all-movies-url">All Movies API URL:</label>
      <input type="text" id="all-movies-url" v-model="allMoviesUrl" />
    </div>
    <div>
      <label for="movie-url">Movie API URL:</label>
      <input type="text" id="movie-url" v-model="movieUrl" />
    </div>
    <button @click="saveUrls">Save URLs</button>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { saveApiUrls } from './apiService.js';

export default {
  setup() {
    const urls = reactive([
      { name: 'Genres API URL', url: '' },
      { name: 'Movietypes API URL', url: '' },
      { name: 'Favorites API URL', url: '' },
      { name: 'All Movies API URL', url: '' },
      { name: 'Movie API URL', url: '' },
    ]);

    function saveUrl(apiName, apiUrl) {
      const existingApi = urls.find(api => api.name === apiName);
      if (existingApi) {
        existingApi.url = apiUrl;
      } else {
        urls.push({ name: apiName, url: apiUrl });
      }
      saveApiUrls(urls);
      console.log(`Saved ${apiName}: ${apiUrl}`);
    }

    return {
      urls,
      saveUrl,
    };
  },
};
</script>

<style scoped>
.settings {
  padding: 20px;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
}
</style>
