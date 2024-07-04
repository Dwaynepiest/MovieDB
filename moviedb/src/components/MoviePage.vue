<template>
  <div class="container">
    <div class="content">
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else class="movie-detail-container">
        <h1>{{ movie.title }}</h1>
        <img :src="getImageUrl(movie.title)" alt="Movie Poster" class="movie-poster">
        <p><strong>Year:</strong> {{ movie.year }}</p>
        <p><strong>Duration:</strong> {{ movie.minutes }} minutes</p>
        <p><strong>Type:</strong> {{ movie.type_name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const movieId = route.params.id;

console.log('Movie ID:', movieId); // Debugging line

const movie = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchMovieDetails = async () => {
  try {
    console.log(`Fetching movie details for ID: ${movieId}`); // Debugging line
    const movieResponse = await axios.get(`http://localhost:3000/movies/${encodeURIComponent(movieId)}`);
    console.log('Movie response data:', movieResponse.data); // Debugging line

    movie.value = movieResponse.data;
    error.value = null; // Clear any previous errors
  } catch (err) {
    console.error('Error fetching movie details:', err);
    if (err.response && err.response.status === 404) {
      error.value = 'Movie not found.';
    } else if (err.response && err.response.status === 400) {
      error.value = 'Bad request. Invalid movie ID.';
    } else {
      error.value = 'An error occurred while fetching movie details.';
    }
  } finally {
    loading.value = false; // Ensure loading is set to false after request completes
  }
};

onMounted(() => {
  fetchMovieDetails();
});

const getImageUrl = (title) => {
  if (!title) return ''; // Return an empty string or a default image path if title is undefined
  return `img/${title.toLowerCase().replace(/ /g, '_')}.jpg`;
};
</script>

  
<style scoped>
  .movie-detail-container {
    padding: 20px;
  }
  
  .movie-poster {
    width: 200px;
    height: auto;
    border-radius: 10px;
  }
  
  h1 {
    font-family: 'Jockey One', sans-serif;
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  p {
    font-family: 'Arial', sans-serif;
    margin: 5px 0;
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
  