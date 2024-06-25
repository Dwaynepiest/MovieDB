<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Reactive variables to store genres, movies, and movie genres
const genres = ref([]);
const movies = ref([]);
const movieGenres = ref([]);
const searchQuery = ref('');
const filterVisible = ref(false);
const selectedGenre = ref('');
const movieGenreMap = ref({});

// Lifecycle hook to initialize data from the APIs on component mount
onMounted(async () => {
    try {
        const [genresResponse, moviesResponse, movieGenresResponse] = await Promise.all([
            axios.get('http://localhost:3000/genres'),
            axios.get('http://localhost:3000/movies'),
            axios.get('http://localhost:3000/movie-genres')
        ]);
        genres.value = genresResponse.data;
        movies.value = moviesResponse.data;
        movieGenres.value = movieGenresResponse.data;

        // Pre-compute the genres for each movie
        const genreMap = {};
        movieGenresResponse.data.forEach(mg => {
            if (!genreMap[mg.movie_id]) {
                genreMap[mg.movie_id] = [];
            }
            genreMap[mg.movie_id].push(mg.genre_id);
        });

        movieGenreMap.value = genreMap;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Function to generate the image URL based on the movie title
const getImageUrl = (type) => `img/${type.toLowerCase().replace(/\s+/g, '_')}.jpg`;

// Computed property to filter movies based on the search query and selected genre
const filteredMovies = computed(() => {
    return movies.value.filter(movie => {
        const matchesSearchQuery = movie.title && movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        // Get cached genre IDs and names
        const movieGenreIds = movieGenreMap.value[movie.id] || [];
        const movieGenresNames = genres.value.filter(g => movieGenreIds.includes(g.id)).map(g => g.genre);

        const matchesGenre = selectedGenre.value === '' || movieGenresNames.includes(selectedGenre.value);
        return matchesSearchQuery && matchesGenre;
    });
});

// Function to map movie IDs to their respective genres
const getMovieGenres = (movieId) => {
    const genreIds = movieGenreMap.value[movieId] || [];
    return genres.value.filter(g => genreIds.includes(g.id)).map(g => g.genre);
};

// Function to toggle filter visibility
const toggleFilter = () => {
    filterVisible.value = !filterVisible.value;
};

// Function to close filter div
const closeFilter = () => {
    filterVisible.value = false;
};
</script>

<template>
    <!-- Search Input -->
    <div>
        <input v-model="searchQuery" placeholder="Search for movies..." class="search-input">
        <button @click="toggleFilter">Filters</button>
    </div>

    <!-- Filter Div -->
    <div v-if="filterVisible" class="filter-container">
        <h3>Filter by Genre</h3>
        <select v-model="selectedGenre">
            <option value="">All</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.genre">{{ genre.genre }}</option>
        </select>
        <button @click="closeFilter">Close</button>
    </div>

    <div class="container">
        <div class="content">
            <!-- Loop through each filtered movie and create a card for each one -->
            <div v-for="movie in filteredMovies" :key="movie.id" class="card-container">
                <div class="card" :style="{ backgroundImage: `url('${getImageUrl(movie.title)}')` }">
                    <div class="overlay"></div>
                    <div class="card-content">
                        <h2 class="card-title">{{ movie.title }}</h2>
                        <p class="card-genre">{{ getMovieGenres(movie.id).join(', ') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

.content {
  width: 202vh;
  padding: 1.5% 0% 5% 6%;
}
.container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}


.card-container {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}

.card {
  width: 250px;
  height: 15vh;
  max-height: 500px;
  border-radius: 25px;
  background-color: rgb(23 23 23 / 84%);
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
  border-radius: 25px;
  top: 0;
  left: 0;
  width: 100%;
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

.search-input {
  width: 400px;
  height: 30px;
  border-radius: 25px;
  margin: 10px;
  padding: 0px 6px;
}

.filter-container {
  margin: 10px 0;
  background-color: rgb(23 23 23 / 84%);
  width: 500px;
  padding: 10px;
  border-radius: 20px;
  position: absolute;
  z-index: 900;
}

.filter-container h3 {
  margin: 0 0 10px;
}

.filter-container select {
  width: 400px;
  height: 30px;
  border-radius: 25px;
  margin: 10px;
  padding: 0px 6px;
}
</style>
