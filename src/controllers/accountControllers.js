const accountServices = require('../services/accountServices');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const loginController = async (req, res) => {
    
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Cần nhập đủ username và password' });
    }

    const { username, password } = req.body;

    try {
        const user = await accountServices.Login(username, password);
        if (!user) {
            return res.status(401).json({ error: 'Không đúng username hoặc password' });
        }
        const accesstoken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
        const refreshtoken = jwt.sign({id: user.id}, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' });
        await accountServices.refreshTokenService(refreshtoken, user.id);
        res.cookie('refreshToken', refreshtoken, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'Đăng nhập thành công', accesstoken});
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Có lỗi xảy ra khi đăng nhập' });
    }
};

const registerController = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
        return res.status(400).json({ error: 'Cần nhập đủ username và password và confirmPassword' });
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ error: 'Password và confirmPassword không khớp' });
    }

    if (await accountServices.checkUserExists(req.body.username)) {
        return res.status(409).json({ error: 'Username đã tồn tại' });
    }

    const { username, password } = req.body;

    try {
        const newUser = await accountServices.Register(username, password);
        res.status(201).json({ message: 'Đăng ký thành công'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Có lỗi xảy ra khi đăng ký' });
    }
};

const deleteUserController = async (req, res) => {
    const user_id = req.user.id;

    try {
        const deletedUser = await accountServices.deleteUserService(user_id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }
        res.status(200).json({ message: 'Xóa tài khoản thành công', user: deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Có lỗi xảy ra khi xóa tài khoản' });
    }
};

const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
        return res.status(401).json({ error: 'Không có refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        const user = await accountServices.checkrefreshTokenService(refreshToken, decoded.id);
        if (!user) {
            return res.status(403).json({ error: 'Refresh token không hợp lệ' });
        }
        const newAccessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ accesstoken: newAccessToken });
    } catch (err) {
        console.error(err);
        res.status(403).json({ error: 'Refresh token không hợp lệ' });
    }
};

const logoutController = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Người dùng chưa đăng nhập' });
    }

    res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'lax' });
    await accountServices.clearrefreshTokenService(req.user.id);
    res.status(200).json({ message: 'Đăng xuất thành công' });
};

module.exports = { loginController, registerController, deleteUserController, refreshTokenController, logoutController };