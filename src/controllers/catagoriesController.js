const {} = require('../services/catagoriesServices');

const getAllCategories = async (req, res) => {
    const user 
    try {
        const categories = await getAllCategories();
        res.status(200).json({ categories, message: 'Lấy danh sách danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};