<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// Use route to get movie type from URL
const route = useRoute();
const movieType = route.params.type; // Get the movie type from the URL parameter

// API URLs
const moviesApiUrl = "http://localhost:3000/movies";
const movieTypesApiUrl = "http://localhost:3000/movie-types";
const movieGenresApiUrl = "http://localhost:3000/movie-genres";
const genresApiUrl = "http://localhost:3000/genres";

// Refs for storing data
const movies = ref([]); // Array to store movies
const movieTypes = ref([]); // Array to store movie types
const movieGenres = ref([]); // Array to store movie genres
const genres = ref([]); // Array to store genres

// Fetch data on component mount
onMounted(async () => {
    try {
        // Fetch data from multiple endpoints concurrently
        const [moviesResponse, movieTypesResponse, movieGenresResponse, genresResponse] = await Promise.all([
            axios.get(moviesApiUrl),
            axios.get(movieTypesApiUrl),
            axios.get(movieGenresApiUrl),
            axios.get(genresApiUrl),
        ]);

        // Store fetched data in reactive variables
        movies.value = moviesResponse.data;
        movieTypes.value = movieTypesResponse.data;
        movieGenres.value = movieGenresResponse.data;
        genres.value = genresResponse.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Computed property to filter movies based on type
const filteredMovies = computed(() => {
    // Find the movie type object that matches the current movieType parameter
    const typeObj = movieTypes.value.find(t => t.movie_type === movieType);
    if (!typeObj) return []; // Return empty array if no matching type found
    const typeId = typeObj.id; // Get the ID of the found movie type

    // Filter movies based on the found type ID
    return movies.value.filter(movie => movie.movie_type === typeId);
});

// Function to get image URL based on movie title
const getImageUrl = (title) => {
    if (!title) return ''; // Return empty string if title is not provided
    return `img/${title.toLowerCase().replace(/ /g, '_')}.jpg`; // Generate and return image URL
};
</script>


<template>
    <div class="container">
        <div class="content">
            <div>
                <h1>Movies under {{ movieType }}</h1>
                <div class="scroll-container">
                    <div v-for="movie in filteredMovies" :key="movie.id" class="card" :style="{ backgroundImage: `url('${getImageUrl(movie.title)}')` }">
                        <div class="overlay"></div>
                        <div class="card-content">
                            <h2 class="card-title">{{ movie.title }}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.scroll-container {
  overflow-x: auto;
  padding: 10px;
}

.card {
  position: relative;
  width: 250px;
  height: 15vh;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 25px;
  background-color: rgba(23, 23, 23, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
  vertical-align: top;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.overlay {
  position: absolute;
  border-radius: 25px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
}

.card:hover .overlay {
  background-color: rgba(0, 0, 0, 0.7);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
  position: relative;
  z-index: 2;
}

.card-title {
  font-size: 18px;
  margin: 0;
  color: white;
  font-family: 'Jockey One', sans-serif;
}

.scroll-container {
  overflow-x: scroll;  
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  width: 100%;
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

h2 {
  font-family: 'Jockey One', sans-serif;
  margin: 0px 5px;
  font-size: 30px;
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
