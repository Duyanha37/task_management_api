const router = require('express').Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
    const usertasks = await pool.query("SELECT * FROM users");
        res.json(usertasks.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;