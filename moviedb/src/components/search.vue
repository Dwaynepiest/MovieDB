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
    { "id": "235548", "genre": "Fantasy", "title": "Dragon's Quest", "year": "2017", "minutes": "115" },
    { "id": "235549", "genre": "Action", "title": "Sky Warriors", "year": "2019", "minutes": "130" },
    { "id": "235550", "genre": "Comedy", "title": "Laugh Factory", "year": "2020", "minutes": "90" },
    { "id": "235551", "genre": "Drama", "title": "Heartstrings", "year": "2018", "minutes": "105" },
    { "id": "235552", "genre": "Sci-Fi", "title": "Galactic Odyssey", "year": "2021", "minutes": "140" },
    { "id": "235553", "genre": "Horror", "title": "Night Terrors", "year": "2016", "minutes": "95" },
    { "id": "235554", "genre": "Romance", "title": "Love in Paris", "year": "2015", "minutes": "110" },
    { "id": "235555", "genre": "Thriller", "title": "Edge of Darkness", "year": "2019", "minutes": "125" },
    { "id": "235556", "genre": "Animation", "title": "Pixie Adventures", "year": "2022", "minutes": "85" },
    { "id": "235557", "genre": "Mystery", "title": "Whispering Shadows", "year": "2017", "minutes": "100" }
];
// const moviesData = "http://localhost:3000/movies";

// Reactive variables to store genres and movies
const genres = ref([]);  // Stores the list of genres
const movies = ref([]);  // Stores the list of movies
const searchQuery = ref('');  // Reactive variable to store the search query
const filterVisible = ref(false);  // Reactive variable to toggle filter visibility
const selectedGenre = ref('');  // Reactive variable to store the selected genre

// Lifecycle hook to initialize genres and movies data on component mount
onMounted(() => {
    genres.value = genresData;
    movies.value = moviesData;
});

// Function to generate the image URL based on the movie title
const getImageUrl = (type) => `img/${type.toLowerCase()}.jpg`;

// Computed property to filter movies based on the search query and selected genre
const filteredMovies = computed(() => {
    return movies.value.filter(movie => {
        const matchesSearchQuery = movie.title && movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesGenre = selectedGenre.value === '' || movie.genre === selectedGenre.value;
        return matchesSearchQuery && matchesGenre;
    });
});

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
}

.content {
  width: 202vh;
  padding-left: 5%;
  padding-bottom: 6%;
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
