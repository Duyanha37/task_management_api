const pool = require('../config/db');

const getCategories = async (id, search) => {
    try {
        let categories;
        if (search) {
            categories = await pool.query('SELECT * FROM categories WHERE user_id = $1 AND name ILIKE "%" || $2 || "%"', [id, search]);
        } else {
            categories = await pool.query('SELECT * FROM categories WHERE user_id = $1', [id]);
        }
        return categories.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getCategoriesByID = async (id) => {
    try {
        const categories = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        return categories.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createCategory = async (categories_name, user_id) => {
    try {
        const categories = await pool.query('INSERT INTO categories (categories_name, user_id) VALUES ($1, $2) RETURNING *', [categories_name, user_id]);
        return categories.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateCategory = async (categories_id, user_id, categories_name) => {
    try {
        const categories = await pool.query('UPDATE categories SET categories_name = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [categories_name, categories_id, user_id]);
        return categories.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const deleteCategory = async (categories_id, user_id) => {
    try {
        const categories = await pool.query('DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *', [categories_id, user_id]);
        return categories.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {getCategories, getCategoriesByID, createCategory, updateCategory, deleteCategory};