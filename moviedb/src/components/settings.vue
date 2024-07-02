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
 document.addEventListener('DOMContentLoaded', function() {
  const fetchMoviesButton = document.getElementById('save');

  if (fetchMoviesButton) {
    fetchMoviesButton.addEventListener('click', function() {
      fetchMovies();
    });
  } else {
    console.error('Element with ID "fetchMovies" not found.');
  }
});

async function fetchMovies() {
  const allMoviesUrl = document.getElementById("all_movies1").value;
  const movieTypeUrl = document.getElementById("movie_type1").value;
  const genresUrl = document.getElementById("genres1").value;
  const favoritesUrl = document.getElementById("favorites1").value;

  try {
    // Ophalen van gegevens van de API van klasgenoot
    const allMoviesResponse = await fetch(allMoviesUrl);
    const movieTypeResponse = await fetch(movieTypeUrl);
    const genresResponse = await fetch(genresUrl);
    const favoritesResponse = await fetch(favoritesUrl);

    // Controleren of de responsen OK zijn
    if (!allMoviesResponse.ok || !movieTypeResponse.ok || !genresResponse.ok || !favoritesResponse.ok) {
      throw new Error('Er is een fout opgetreden bij het ophalen van de gegevens.');
    }

    // Omzetten naar JSON
    const allMoviesData = await allMoviesResponse.json();
    const movieTypeData = await movieTypeResponse.json();
    const genresData = await genresResponse.json();
    const favoritesData = await favoritesResponse.json();

    // Hier kun je de gegevens verder verwerken, bijvoorbeeld:
    console.log("Alle films:", allMoviesData);
    console.log("Filmtype:", movieTypeData);
    console.log("Genres:", genresData);
    console.log("Favorieten:", favoritesData);

    // Voorbeeld: Toon de films op de pagina
    // Vervang dit met je eigen logica om de films te tonen op basis van de ontvangen gegevens

    alert('Films zijn succesvol opgehaald!');
  } catch (error) {
    console.error('Fout bij het ophalen van films:', error);
    alert('Er is een fout opgetreden bij het ophalen van de films.');
  }
}

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
