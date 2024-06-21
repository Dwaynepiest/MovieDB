const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviedb'
};

const db = mysql.createPool(dbConfig);


app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>API Home Page</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #333; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 5px 0; }
          a { text-decoration: none; color: #007BFF; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Welcome to the MovieDB API</h1>
        <p>This is the home page. Here are the available API links:</p>
        <ul>
          <li><a href="/movies">/movies</a></li>
          <li><a href="/users">/users</a></li>
          <li><a href="/genres">/genres</a></li>
          <li><a href="/movie-types">/movie-types</a></li>
        </ul>
      </body>
      </html>
    `);
  });

app.get('/movies', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM movies');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching movies', error: err.message });
  }
});
app.get('/users', async (req, res) => {
    try {
      const [rows, fields] = await db.execute('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
  });
  app.get('/genres', async (req, res) => {
    try {
      const [rows, fields] = await db.execute('SELECT * FROM genres');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching genres', error: err.message });
    }
  });
  app.get('/movie-types', async (req, res) => {
    try {
      const [rows, fields] = await db.execute('SELECT * FROM movie_types');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching movie_types', error: err.message });
    }
  });
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.post('/movie_post', async (req, res) => {
  try {
    const { title, year, minutes } = req.body;
    const movie = await db.movie.create({ title, year, minutes });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});