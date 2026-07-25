const categoriesServices = require('../services/categoriesServices');
const auth = require('../middlewares/authorization');

const getCategories = async (req, res) => {
    const user_id = req.user.id;
    let search = undefined;
    if (!req.query.search) {
        search = req.query.name;
    }

    try {
        const categories = await categoriesServices.getCategories(user_id, search);
        res.status(200).json({ categories, message: 'Lấy danh sách danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoriesByID = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoriesServices.getCategoriesByID(id);
        if (!category) {
            return res.status(404).json({ message: 'Danh mục không tồn tại' });
        }
        res.status(200).json({ category, message: 'Lấy danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    const { categories_name } = req.body;
    const user_id = req.user.id;
    try {
        const category = await categoriesServices.createCategory(categories_name, user_id);
        if (!category) {
            return res.status(400).json({ message: 'Tạo danh mục thất bại' });
        }
        res.status(201).json({ category, message: 'Tạo danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    const categories_id = req.params.id;
    const { categories_name } = req.body;
    const user_id = req.user.id;
    try {
        const category = await categoriesServices.updateCategory(categories_id, user_id, categories_name);
        if (!category) {
            return res.status(404).json({ message: 'Danh mục không tồn tại' });
        }
        res.status(200).json({ category, message: 'Cập nhật danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

const deleteCategory = async (req, res) => {
    const categories_id = req.params.id;
    const user_id = req.user.id;
    try {
        const category = await categoriesServices.deleteCategory(categories_id, user_id);
        if (!category) {
            return res.status(404).json({ message: 'Danh mục không tồn tại' });
        }
        res.status(200).json({ category, message: 'Xóa danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {getCategories, getCategoriesByID, createCategory, updateCategory, deleteCategory};