<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Reactive variables to store genres, movies, and movie genres
const genres = ref([]);
const movies = ref([]);
const movieGenres = ref([]);
const searchQuery = ref(''); // Reactive variable for search query
const filterVisible = ref(false); // Reactive variable for filter visibility
const selectedGenre = ref(''); // Reactive variable for selected genre
const movieGenreMap = ref({}); // Reactive variable to map movie IDs to their genres

// Lifecycle hook to initialize data from the APIs on component mount
onMounted(async () => {
    try {
        // Fetch data from multiple endpoints concurrently
        const [genresResponse, moviesResponse, movieGenresResponse] = await Promise.all([
            axios.get('http://localhost:3000/genres'),
            axios.get('http://localhost:3000/movies'),
            axios.get('http://localhost:3000/movie-genres')
        ]);

        // Store the fetched data in reactive variables
        genres.value = genresResponse.data;
        movies.value = moviesResponse.data;
        movieGenres.value = movieGenresResponse.data;

        // Pre-compute the genres for each movie and store in a map
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

        // Check if the movie matches the selected genre
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
        <select v-model="selectedGenre" class="genre-select">
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
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.content {
  width: 90%;
  padding: 1.5% 0 5% 0;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-container {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.card {
  width: 250px;
  height: 15vh;
  max-height: 500px;
  border-radius: 25px;
  background-color: rgb(23 23 23 / 84%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.card-genre {
  color: white;
}

.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.search-input {
  width: 50%;
  height: 30px;
  border-radius: 25px;
  margin: 10px;
  padding: 0 6px;
}

.filter-button {
  height: 30px;
  border-radius: 25px;
  padding: 0 20px;
}

.filter-container {
  margin: 10px 0;
  background-color: rgb(23 23 23 / 84%);
  width: 35%;
  padding: 10px;
  border-radius: 20px;
  position: absolute;
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-container h3 {
  margin: 0 0 10px;
}

.genre-select {
  width: 80%;
  height: 30px;
  border-radius: 25px;
  margin: 10px 0;
  padding: 0 6px;
}

.close-button {
  height: 30px;
  border-radius: 25px;
  padding: 0 20px;
}

/* Media Queries for Responsiveness */
@media only screen and (max-width: 768px) {
  .card {
    width: 200px;
  }
  .search-input {
    width: 60%;
  }
  .filter-container {
    width: 60%;
  }
  .genre-select {
    width: 80%;
  }
}

@media only screen and (max-width: 480px) {
  .card {
    width: 150px;
  }
  .search-input {
    width: 70%;
  }
  .filter-container {
    width: 70%;
  }
  .genre-select {
    width: 80%;
  }
}
</style>
