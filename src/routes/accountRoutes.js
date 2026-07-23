const router = require('express').Router();
const { loginController, registerController } = require('../controllers/accountControllers');

router.get('/', (req, res) => {
    res.send('Mời đăng nhập');
})

router.post('/', loginController);

router.post('/register', registerController);

module.exports = router;