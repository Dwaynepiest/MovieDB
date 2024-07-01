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
const all_movies = document.getElementById("all_movies1").value //naar api en check op id
const movie_type = document.getElementById("movie_type1").value //naar api en check op id
const genres = document.getElementById("genres1").value //naar api en check op id
const favorites = document.getElementById('favorites1').value //naar api en check op id
const movie1 = document.getElementById("movie1").value //naar api en check op id
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
