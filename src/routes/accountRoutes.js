const router = require('express').Router();
const { loginController, registerController, deleteUserController } = require('../controllers/accountControllers');
const auth = require('../middlewares/authorization');

router.get('/', (req, res) => {
    res.send('Mời đăng nhập');
})

router.post('/', loginController);

router.post('/register', registerController);

router.delete('/deleteUser', auth , deleteUserController);

module.exports = router;