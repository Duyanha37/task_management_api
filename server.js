const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const pool = require('./src/config/db');
const port = process.env.PORT || 3000;
const taskRoutes = require('./src/routes/taskRoutes');
const loginRoutes = require('./src/routes/loginRoutes');

app.use(express.json());

app.use('/', loginRoutes);

app.use('/app', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});