<script setup>
import { ref, onMounted, computed } from 'vue';

const genresData = [
    { "id": 1, "genre": "Action" },
    { "id": 2, "genre": "Comedy" },
    { "id": 3, "genre": "Drama" },
    { "id": 4, "genre": "Horror" },
    { "id": 5, "genre": "Sci-Fi" },
    { "id": 6, "genre": "Romance" },
    { "id": 7, "genre": "Thriller" },
    { "id": 8, "genre": "Fantasy" },
    { "id": 9, "genre": "Documentary" },
    { "id": 10, "genre": "Theater" }
];

const moviesData = [
    { "id": "375282", "genre": "Comedy", "title": "La comadre", "year": "1981", "minutes": "45" },
    { "id": "375284", "genre": "Drama", "title": "Comer es un placer", "year": "1986", "minutes": "120" },
    { "id": "375289", "genre": "Sci-Fi", "title": "Computer Control Alt Delete", "year": "1994", "minutes": "50" },
    { "id": "218784", "genre": "Theater", "title": "Rite Here Rite Now", "year": "2024", "minutes": "145" },
    { "id": "445745", "genre": "Action", "title": "The Great Adventure", "year": "2020", "minutes": "130" },
    { "id": "514531", "genre": "Romance", "title": "Love in the Time of AI", "year": "2023", "minutes": "90" },
    { "id": "781552", "genre": "Thriller", "title": "Mystery Chronicles", "year": "2019", "minutes": "60" },
    { "id": "125487", "genre": "Documentary", "title": "The Art of Coding", "year": "2021", "minutes": "80" },
    { "id": "325874", "genre": "Documentary", "title": "Nature Uncovered", "year": "2022", "minutes": "50" },
    { "id": "125762", "genre": "Comedy", "title": "Christmas Extravaganza", "year": "2018", "minutes": "45" },
    { "id": "044877", "genre": "Horror", "title": "Nightmare on Elm Street", "year": "1984", "minutes": "92" },
    { "id": "377621", "genre": "Fantasy", "title": "The Magic Realm", "year": "2021", "minutes": "110" },
    { "id": "515782", "genre": "Action", "title": "High Speed Chase", "year": "2022", "minutes": "95" },
    { "id": "215522", "genre": "Sci-Fi", "title": "Future World", "year": "2018", "minutes": "120" },
    { "id": "152857", "genre": "Romance", "title": "Eternal Love", "year": "2019", "minutes": "110" },
    { "id": "175486", "genre": "Thriller", "title": "Silent Killer", "year": "2020", "minutes": "100" },
    { "id": "875210", "genre": "Horror", "title": "Ghost Mansion", "year": "2023", "minutes": "85" },
    { "id": "235548", "genre": "Fantasy", "title": "Dragon's Quest", "year": "2017", "minutes": "115" }
];

// Reactive variables to store genres and movies
const genres = ref([]);  // Stores the list of genres
const movies = ref([]);  // Stores the list of movies
const searchQuery = ref('');  // Reactive variable to store the search query

// Lifecycle hook to initialize genres and movies data on component mount
onMounted(() => {
    genres.value = genresData;
    movies.value = moviesData;
});

// Function to generate the image URL based on the movie title
const getImageUrl = (type) => `img/${type.toLowerCase()}.jpg`;

// Computed property to filter movies based on the search query
const filteredMovies = computed(() => {
    // Filter movies whose title includes the search query (case-insensitive)
    return movies.value.filter(movie => movie.title && movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<template>
    <!-- Search Input -->
    <div>
        <!-- Two-way data binding for the search input -->
        <input v-model="searchQuery" placeholder="Search for movies...">
    </div>
  
    <!-- Loop through each filtered movie and create a card for each one -->
    <div v-for="movie in filteredMovies" :key="movie.id" class="card-container">
        <!-- Card component for each movie -->
        <div class="card" 
             :style="{ backgroundImage: `url('${getImageUrl(movie.title)}')` }"> <!-- Set background image -->
            <div class="overlay"></div>
            <div class="card-content">
                <!-- Display the movie title -->
                <h2 class="card-title">{{ movie.title }}</h2>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
}

.overlay {
  /* position: absolute; */
  border-radius: 25px;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100%; */
  background-color: rgba(0, 0, 0, 0.5);
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
</style>