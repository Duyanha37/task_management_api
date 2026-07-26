const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const pool = require('./src/config/db');
const port = process.env.PORT || 3000;
const tasksRoutes = require('./src/routes/tasksRoutes');
const accountRoutes = require('./src/routes/accountRoutes');
const categoriesRoutes = require('./src/routes/categoriesRoutes');

app.use(express.json());

app.use('/', accountRoutes);

app.use('/categories', categoriesRoutes);

app.use('/app', tasksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});