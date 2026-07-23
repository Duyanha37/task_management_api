const accountServices = require('../services/accountServices');

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
        res.status(200).json({ message: 'Đăng nhập thành công', user });
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

    const { username, password } = req.body;

    try {
        const newUser = await accountServices.Register(username, password);
        res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Có lỗi xảy ra khi đăng ký' });
    }
};

module.exports = { loginController, registerController };