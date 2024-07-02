<style>
.endpoints {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
form {
  text-align: center;
}
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
}
.all_movies{
  margin-bottom: 15px;
}
.movie_type {
  margin-bottom: 15px;
}
.genres {
  margin-bottom: 15px;
}
.favorites {
  margin-bottom: 15px;
}
.movie {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
<script setup>
  async function sendData() {
      // Haal de values uit de inputvelden
      const allMovies = document.getElementById("all_movies1").value;
      const movieType = document.getElementById("movie_type1").value;
      const genres = document.getElementById("genres1").value;
      const favorites = document.getElementById("favorites1").value;

      // Log values om te controleren
      console.log("All Movies:", allMovies);
      console.log("Movie Type:", movieType);
      console.log("Genres:", genres);
      console.log("Favorites:", favorites);

      // Data object voorbereiden
      const data = {
        allMovies: allMovies,
        movieType: movieType,
        genres: genres,
        favorites: favorites
      };

      try {
        // Verzenden van data naar de API
        const response = await fetch('http://localhost:3000/movie/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        // Respons van de API controleren
        const result = await response.json();

        console.log("Response Status:", response.status);
        console.log("Response Data:", result);

        if (response.ok) {
          // Controleer of de respons een movieId bevat en gebruik deze
          if (result.movieId) {
            alert('Movie ID is correct and data is saved successfully! Movie ID: ' + result.movieId);
          } else {
            alert('Movie ID is not found in the response.');
          }
        } else {
          alert('Failed to save data: ' + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving data.');
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('save').addEventListener('click', function(event) {
        event.preventDefault(); // Voorkomt het standaard submit gedrag van een formulier
        sendData();
      });
    });

</script>
    <template>
  <div class="form-container">
    <form>
      <div class="all_movies">
        <label for="all_movies">All Movies</label>
        <input type="text" id="all_movies1" />
      </div>
      <div class="movie_type">
        <label for="movie_type">By Movie Type</label>
        <input type="text" id="movie_type1" />
      </div>
      <div class="genres">
        <label for="genres">By Genre</label>
        <input type="text" id="genres1" />
      </div>
      <div class="favorites">
        <label for="favorites">Favorites</label>
        <input type="text" id="favorites1" />
      </div>
      <div class="movie">
        <label for="movie">Movie</label>
        <input type="text" id="movie1" />
      </div>
      <div class="sumbit">
        <input type="button" value="Save" id="save">
      </div>
    </form>
  </div>
</template>
