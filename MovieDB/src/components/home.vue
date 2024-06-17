<script setup>
// Importing `ref` and `onMounted` from Vue to create reactive state and execute code when the component is mounted.
import { ref, onMounted } from 'vue';

// Sample data containing different types of movies.
// will have to figure out how we will do it with the api
const jsonData = [
    { "id": 1, "movie_type": "TV MiniSeries" },
    { "id": 2, "movie_type": "TV Series" },
    { "id": 3, "movie_type": "Movie" },
    { "id": 4, "movie_type": "Short" },
    { "id": 5, "movie_type": "TV Movie" },
    { "id": 6, "movie_type": "TV Episode" },
    { "id": 7, "movie_type": "TV Special" },
    { "id": 8, "movie_type": "Video" },
    { "id": 9, "movie_type": "Videogame" }
];

// Create a reactive variable to hold the movie types.
const movieTypes = ref([]);

// When the component is mounted, assign the jsonData to the reactive movieTypes variable.
onMounted(() => {
    movieTypes.value = jsonData;
});

// Function to get the image URL based on the genre type.
const getImageUrl = (genre) => `img/${genre.toLowerCase()}.jpg`;
</script>

<template>
    <!-- Container for the scroll title -->
    <div id="scroll-title">
        <h2>Type</h2>
    </div>

    <!-- Main container for the movie type cards, styled as a scroll container -->
    <div id="type-container" class="scroll-container">
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
</template>


<style scoped>
.scroll-container {
  overflow-x: auto;
  white-space: nowrap; 
  padding: 20px;
}

.card {
  position: relative;
  width: 45%;
  max-width: 200px;
  height: 20vh;
  max-height: 500px;
  margin-right: 2%;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
  vertical-align: top;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  z-index: 1;
}

.card-title {
  font-size: 18px;
  margin: 0;
  color: white;
}

.scroll-container {
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

#scroll-title {
  margin-bottom: 0px;
  width: fit-content;
  padding-left: 3%;
}
</style>
