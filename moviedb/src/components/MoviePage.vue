<template>
    <div class="movie-detail-container" v-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="getImageUrl(movie.title)" alt="Movie Poster" class="movie-poster">
      <p><strong>Year:</strong> {{ movie.year }}</p>
      <p><strong>Duration:</strong> {{ movie.minutes }} minutes</p>
      <p><strong>Type:</strong> {{ movieTypeName }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
</template>
  
<script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const movieId = route.params.id;
  
  const movie = ref(null);
  const movieTypes = ref([]);
  const genres = ref([]);
  const movieGenres = ref([]);
  
  const fetchMovieDetails = async () => {
    try {
      const [movieResponse, movieTypesResponse] = await Promise.all([
        axios.get(`http://localhost:3000/movies/${movieId}`),
        axios.get('http://localhost:3000/movie-types'),
      ]);
  
      movie.value = movieResponse.data;
      movieTypes.value = movieTypesResponse.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      console.error('Error message:', error.message);
      console.error('Error config:', error.config);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
    }
  };
  
  onMounted(() => {
    fetchMovieDetails();
  });
  
  const getImageUrl = (title) => {
    if (!title) return '';  // Return an empty string or a default image path if title is undefined
    return `img/${title.toLowerCase().replace(/ /g, '_')}.jpg`;
  };
  
  const movieTypeName = computed(() => {
    if (!movie.value || !movieTypes.value.length) return '';
    const type = movieTypes.value.find(type => type.id === movie.value.movie_type);
    return type ? type.movie_type : 'Unknown';
  });
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
</style>
  