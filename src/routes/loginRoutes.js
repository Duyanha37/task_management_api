const router = require('express').Router();
const pool = require('../config/db');

router.get('/', (req, res) => {
    res.send('Mời đăng nhập');
})

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const count = await pool.query('SELECT checkLogin($1, $2)', [username, password]);
        if (count.rows[0].checklogin === 1)
            console.log({ message: 'Login successful' });
        else
            console.log({ message: 'Login failed' });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;