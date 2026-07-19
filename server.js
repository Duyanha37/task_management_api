const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const pool = require('./src/config/db');
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});