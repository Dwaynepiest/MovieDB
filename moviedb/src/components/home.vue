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
                            <svg class="star-icon" width="50px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="M10.3072 7.21992C10.9493 5.61924 11.2704 4.81889 11.7919 4.70797C11.9291 4.6788 12.0708 4.6788 12.208 4.70797C12.7295 4.81889 13.0506 5.61924 13.6927 7.21992C14.0578 8.1302 14.2404 8.58535 14.582 8.89491C14.6778 8.98174 14.7818 9.05907 14.8926 9.12582C15.2874 9.3638 15.7803 9.40794 16.7661 9.49623C18.4348 9.64568 19.2692 9.7204 19.524 10.1961C19.5768 10.2947 19.6127 10.4014 19.6302 10.5118C19.7146 11.0448 19.1012 11.6028 17.8744 12.719L17.5338 13.0289C16.9602 13.5507 16.6735 13.8116 16.5076 14.1372C16.4081 14.3325 16.3414 14.5429 16.3101 14.7598C16.258 15.1215 16.342 15.5 16.5099 16.257L16.5699 16.5275C16.8711 17.885 17.0217 18.5638 16.8337 18.8974C16.6649 19.1971 16.3538 19.389 16.0102 19.4054C15.6277 19.4236 15.0887 18.9844 14.0107 18.106C13.3005 17.5273 12.9454 17.238 12.5512 17.1249C12.191 17.0216 11.8089 17.0216 11.4487 17.1249C11.0545 17.238 10.6994 17.5273 9.98917 18.106C8.91119 18.9844 8.37221 19.4236 7.98968 19.4054C7.64609 19.389 7.33504 19.1971 7.16617 18.8974C6.97818 18.5638 7.12878 17.885 7.42997 16.5275L7.48998 16.257C7.65794 15.5 7.74191 15.1215 7.6898 14.7598C7.65854 14.5429 7.59182 14.3325 7.49232 14.1372C7.32645 13.8116 7.03968 13.5507 6.46613 13.0289L6.12546 12.719C4.89867 11.6028 4.28527 11.0448 4.36975 10.5118C4.38724 10.4014 4.42312 10.2947 4.47589 10.1961C4.73069 9.7204 5.56507 9.64568 7.23384 9.49623C8.21962 9.40794 8.71251 9.3638 9.10735 9.12582C9.2181 9.05907 9.32211 8.98174 9.41793 8.89491C9.75954 8.58535 9.94211 8.1302 10.3072 7.21992Z" fill="#ffea00" stroke="#ffea00" stroke-width="2"></path>
                              </g>
                            </svg>
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
  background-color: transparent !important;
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

.star-icon path {
  fill: rgb(155, 155, 155);
  stroke: rgb(155, 155, 155);
  transition: fill 0.3s, stroke 0.3s;
}

.star-icon path:hover {
  fill: #ffea00;
  stroke: #ffea00;
}
</style>