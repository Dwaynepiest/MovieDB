<template>
    <div class="container">
      <div class="content">
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

  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genresUrl: '',
      movietypesUrl: '',
      favoritesUrl: '',
      allMoviesUrl: '',
      movieUrl: '',
    };
  },
  methods: {
    saveUrls() {
      const urls = {
        genresUrl: this.genresUrl,
        movietypesUrl: this.movietypesUrl,
        favoritesUrl: this.favoritesUrl,
        allMoviesUrl: this.allMoviesUrl,
        movieUrl: this.movieUrl,
      };
      console.log('Saving URLs:', urls);
      this.$emit('save-urls', urls);
    },
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
  width: 10%;
  padding: 8px;
  margin-top: 5px;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
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

