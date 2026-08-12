const router = require('express').Router();
const { loginController, registerController, deleteUserController, refreshTokenController, logoutController } = require('../controllers/accountControllers');
const auth = require('../middlewares/authorization');

router.post('/login', loginController);

router.post('/refresh', refreshTokenController);

router.post('/register', registerController);

router.delete('/deleteUser', auth , deleteUserController);

router.post('/logout', auth, logoutController);

module.exports = router;