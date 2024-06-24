<script setup>
import { ref, onMounted } from 'vue';

const movieTypesApiUrl = "http://localhost:3000/movie-types";

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

const movieTypes = ref([]);
const genres = ref([]);
const movies = ref([]);

onMounted(async () => {
    try {
        const response = await fetch(movieTypesApiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        movieTypes.value = data;
    } catch (error) {
        console.error('Error fetching movie types:', error);
        // Add more specific handling based on the error type
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            // Handle specific error case, e.g., show a message to the user
        } else {
            // Handle other types of errors, e.g., show a generic error message
        }
    }
    genres.value = genresData;
    movies.value = moviesData;
});


const getImageUrl = (type) => `img/${type.toLowerCase().replace(/ /g, '_')}.jpg`;

const filterMoviesByGenre = (genre) => {
    return movies.value.filter(movie => movie.genre === genre);
};
</script>


<template>
    <div class="container">
      <div class="content">
        <!-- Container for the scroll title -->
        <div>
            <h2>Type</h2>
        </div>
        <!-- Main container for the movie type cards, styled as a scroll container -->
        <div class="scroll-container">
            <!-- Loop through each item in the movieTypes array and create a card for each one -->
            <div v-for="type in movieTypes" :key="type.id" class="card" 
                :style="{ backgroundImage: `url('${getImageUrl(type.movie_type)}')` }">
                <!-- Overlay div to add a dark layer over the background image -->
                <div class="overlay"></div>
                <!-- Content container for the card -->
                <div class="card-content">
                    <!-- Display the movie type as the card title -->
                    <h2 class="card-title">{{ type.movie_type }}</h2>
                </div>
            </div>
        </div>

        <!-- Loop through each genre and create a separate scroll container for each -->
        <div v-for="genre in genres" :key="genre.id">
            <!-- Container for the genre title -->
            <div>
                <h2>{{ genre.genre }}</h2>
            </div>
            <!-- Main container for the movies cards, styled as a scroll container -->
            <div class="scroll-container">
                <!-- Loop through each movie that belongs to the current genre and create a card for each one -->
                <div v-for="movie in filterMoviesByGenre(genre.genre)" :key="movie.id" class="card" 
                    :style="{ backgroundImage: `url('${getImageUrl(movie.title)}')` }">
                    <!-- Overlay div to add a dark layer over the background image -->
                    <div class="overlay"></div>
                    <!-- Content container for the card -->
                    <div class="card-content">
                        <!-- Display the movie title as the card title -->
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
  white-space: nowrap; 
  padding: 10px;
}

.card {
  position: relative;
  width: 45%;
  max-width: 250px;
  height: 15vh;
  max-height: 500px;
  margin-right: 2%;
  margin-bottom: 20px;
  border-radius: 25px;
  background-color: rgba(23, 23, 23, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
  vertical-align: top;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add transitions */
}

.card:hover {
  transform: scale(1.05); /* Scale up the card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Enhance the shadow effect */
}

.overlay {
  position: absolute;
  border-radius: 25px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease; /* Add transition for the overlay */
}

.card:hover .overlay {
  background-color: rgba(0, 0, 0, 0.7); /* Darken the overlay on hover */
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
  width: 1824px;
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

#scroll-title {
  margin-bottom: 0px;
  width: fit-content;
  padding-left: 3%;
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
}

.content {
  width: 202vh;
  padding: 0% 5% 4% 5%;
}
</style>
