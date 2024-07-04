const express = require('express');
const mysql = require('mysql2/promise');

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


const app = express();
app.use(express.json());
app.use(cors(corsOptions));


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
        <li><a href="/favorites">/favorites</a></li>
        <li><a href="/genres">/genres</a></li>
        <li><a href="/movies">/movies</a></li>
        
        <li><a href="/movie-types">/movie-types</a></li>
        <li><a href="/movie-genres">/movie-genres</a></li>
        <li><a href="/users">/users</a></li>
        
      </ul>
    </body>
    </html>
  `);
});
app.get('/favorites', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM favorites');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching favorites', error: err.message });
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
app.get('/movies', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM movies');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching movies', error: err.message });
  }
});
// app.get('/movies/:id', async (req, res) => {
//   const movieId = parseInt(req.params.id, 10);
//   try {
//     const connection = await mysql.createConnection(dbConfig);
//     const [rows, fields] = await connection.execute('SELECT * FROM movies WHERE id = ?', [movieId]);
//     connection.end(); // Close connection after query
//     if (rows.length === 0) {
//       return res.status(404).send({ error: 'Movie not found' });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching movie', error: err.message });
//   }
// });
app.get('/movies/:id', async (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('SELECT * FROM movies WHERE id = ?', [movieId]);
    connection.end();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' }); // Send JSON response for clarity
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching movie', error: err.message });
  }
});
app.get('/movie-genres', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM movie_genres');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching movie_genres', error: err.message });
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
app.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

/*app.post('/movie/post', async (req, res) => {
  try {
    const { title, year, minutes } = req.body;
    const sql = 'INSERT INTO movies (title, year, minutes) VALUES (?, ?, ?)';
    const [result] = await db.execute(sql, [title, year, minutes]);
    res.status(201).json({ id: result.insertId, title, year, minutes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/
app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [result] = await db.execute(sql, [email, password]);
    res.status(201).json({ id: result.insertId, email, password });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old password and new password are required.' });
    }

    const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (oldPassword !== user[0].password) {
      return res.status(401).json({ error: 'Incorrect old password' });
    }

    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    await db.execute(sql, [newPassword, id]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password } = req.body;
    const sql = 'UPDATE users SET email =?, password =? WHERE id =?';
    await db.execute(sql, [email, password, userId]);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id =?';
    await db.execute(sql, [id]);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/favorites', async (req, res) => {
  try {
    const { user_id, movie_id } = req.body;
    const sql = 'INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)';
    const [result] = await db.execute(sql, [user_id, movie_id]);
    res.status(201).json({ user_id, movie_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/favorites/:user_id/:movie_id', async (req, res) => {
  try {
    const { user_id, movie_id } = req.params;
    const sql = 'DELETE FROM favorites WHERE user_id = ? AND movie_id = ?';
    const [result] = await db.execute(sql, [user_id, movie_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => { console.log('Server running on (http://localhost:3000)'); }); 


