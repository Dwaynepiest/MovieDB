<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const movieTypesApiUrl = "http://localhost:3000/movie-types";
const movieGenreApiUrl = "http://localhost:3000/genres";
const moviesApiUrl = "http://localhost:3000/movies";
const movieGenresApiUrl = "http://localhost:3000/movie-genres";
// const favoritesApiUrl = "http://localhost:3000/favorites"; // Assuming this is your endpoint for favorites
const favoritesApiUrl = 'http://localhost:3000/favorites';


const movieTypes = ref([]);
const movieGenres = ref([]);
const genres = ref([]);
const movies = ref([]);
const movieGenreMap = ref({});
const loggedInUser = ref(null); // Ref to store the logged-in user's data
const favorites = ref([]); // Store the user's favorite movies

// For navigation
const router = useRouter();
const route = useRoute();
const movieType = route.params.type;

onMounted(async () => {
  try {
    const [movieTypesResponse, genresResponse, moviesResponse, movieGenresResponse] = await Promise.all([
      axios.get(movieTypesApiUrl),
      axios.get(movieGenreApiUrl),
      axios.get(moviesApiUrl),
      axios.get(movieGenresApiUrl)
    ]);

    movieTypes.value = movieTypesResponse.data;
    movieGenres.value = movieGenresResponse.data;
    genres.value = genresResponse.data;
    movies.value = moviesResponse.data;

    // Pre-compute the genres for each movie
    const genreMap = {};
    movieGenresResponse.data.forEach(mg => {
      if (!genreMap[mg.movie_id]) {
        genreMap[mg.movie_id] = [];
      }
      genreMap[mg.movie_id].push(mg.genre_id);
    });
    movieGenreMap.value = genreMap;

    // Fetch logged-in user data from session storage
    const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (storedUser) {
      loggedInUser.value = storedUser;
      await fetchFavorites(); // Fetch the user's favorite movies
    } else {
      console.error('No user data found in session storage.');
      // Optionally handle this case, e.g., redirect to login page
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const fetchFavorites = async () => {
  if (!loggedInUser.value) {
    console.error('User not logged in');
    return;
  }

  try {
    const response = await axios.get(`${favoritesApiUrl}?user_id=${loggedInUser.value.id}`);
    favorites.value = response.data;
    console.log('Fetched favorites:', favorites.value);
  } catch (error) {
    console.error('Error fetching favorites:', error.response ? error.response.data : error);
  }
};

const getImageUrl = (type) => {
  if (!type) return ''; // Return an empty string or a default image path if type is undefined
  return `img/${type.toLowerCase().replace(/ /g, '_')}.jpg`;
};

const filterMoviesByGenre = (genre) => {
  const genreObj = genres.value.find(g => g.genre === genre);
  if (!genreObj) return []; // Return an empty array if the genre is not found
  const genreId = genreObj.id;
  return movies.value.filter(movie => movieGenreMap.value[movie.id] && movieGenreMap.value[movie.id].includes(genreId));
};

// Navigate to the movie type page
const navigateToType = (type) => {
  router.push({ path: `/movie-type/${type}` });
};

const toggleFavorite = async (movieId) => {
  if (!loggedInUser.value) {
    console.error('User not logged in');
    return;
  }

  try {
    const favoriteIndex = favorites.value.findIndex(favorite => favorite.user_id === loggedInUser.value.id && favorite.movie_id === movieId);
    if (favoriteIndex!== -1) {
      const favoriteId = favorites.value[favoriteIndex].id;
      await axios.delete(`${favoritesApiUrl}/${favoriteId}`);
      favorites.value.splice(favoriteIndex, 1);
      console.log('Removed from favorites', movieId);
    } else {
      const favoriteData = { user_id: loggedInUser.value.id, movie_id: movieId };
      const response = await axios.post(favoritesApiUrl, favoriteData);
      favorites.value.push({...favoriteData, id: response.data.id });
      console.log('Added to favorites', movieId);
    }
  } catch (error) {
    console.error('Error toggling favorite status:', error.response? error.response.data : error);
  }
};

// Filtered movies for the dynamic page
const filteredMovies = computed(() => {
  if (!movieType) return [];
  const genreObj = genres.value.find(g => g.genre === movieType);
  if (!genreObj) return [];
  const genreId = genreObj.id;
  return movies.value.filter(movie => {
    const movieGenre = movieGenres.value.find(mg => mg.movie_id === movie.id);
    return movieGenre && movieGenre.genre_id === genreId;
  });
});

const isFavorite = (movieId) => {
  return favorites.value.includes(movieId);
};
</script>

<template>
  <div class="container">
      <div class="content">
          <!-- Movie Types -->
          <div>
              <h2>Movie Types</h2>
          </div>
          <div class="scroll-container">
              <div v-for="type in movieTypes" :key="type.id" class="card" :style="{ backgroundImage: `url('${getImageUrl(type.movie_type)}')` }" @click="navigateToType(type.movie_type)">
                  <div class="overlay"></div>
                  <div class="card-content">
                      <h2 class="card-title">{{ type.movie_type }}</h2>
                  </div>
              </div>
          </div>

          <!-- Movie Genres -->
          <div>
              <h2>Movie Genres</h2>
          </div>
          <div class="scroll-container">
              <div v-for="type in genres" :key="type.id" class="card" :style="{ backgroundImage: `url('${getImageUrl(type.genre)}')` }">
                  <div class="overlay"></div>
                  <div class="card-content">
                      <h2 class="card-title">{{ type.genre }}</h2>
                  </div>
              </div>
          </div>

          <!-- Movies by Genre -->
          <div v-for="genre in genres" :key="genre.id">
              <div>
                  <h2>{{ genre.genre }}</h2>
              </div>
              <div class="scroll-container"> 
                  <div v-for="movie in filterMoviesByGenre(genre.genre)" :key="movie.id" class="card" :style="{ backgroundImage: `url('${getImageUrl(movie.title)}')` }">
                      <div class="overlay"></div>
                      <div class="card-content">
                          <h2 class="card-title">{{ movie.title }}</h2>
                          <button :class="['favorite-button', { 'favorite': isFavorite(movie.id) }]" @click.stop="toggleFavorite(movie.id)">
                              ⭐
                          </button>
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

.favorite-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
  transition: color 0.3s ease;
}

.favorite-button.favorite {
  color: yellow;
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