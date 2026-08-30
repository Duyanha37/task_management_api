const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const pool = require('./src/config/db');
const cookieparser = require('cookie-parser');
const port = process.env.PORT || 3000;
const tasksRoutes = require('./src/routes/tasksRoutes');
const accountRoutes = require('./src/routes/accountRoutes');
const categoriesRoutes = require('./src/routes/categoriesRoutes');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieparser());

app.use('/api/accounts', accountRoutes);

app.use('/api/categories', categoriesRoutes);

app.use('/api/tasks', tasksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});