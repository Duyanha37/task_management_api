const pool = require('../config/db');

const getTasksServices = async (user_id, search) => {
    try {
        if (search) {
            const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1 AND name ILIKE "%" || $2 || "%"', [user_id, search]);
            return tasks.rows;
        } else {
            const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
            return tasks.rows;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getTaskByIDServices = async (id) => {
    try {
        const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        return task.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createTaskServices = async (user_id, categories_id, title, description, date, priority, status) => {
    try {
        const task = await pool.query('INSERT INTO tasks (user_id, categories_id, title, description, date, priority, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, categories_id, title, description, date, priority, status]);
        return task.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateTaskServices = async (task_id, user_id, categories_id, title, description, date, priority, status) => {
    try {
        const task = await pool.query('UPDATE tasks SET categories_id = $1, title = $2, description = $3, date = $4, priority = $5, status = $6 WHERE id = $7 AND user_id = $8 RETURNING *', [categories_id, title, description, date, priority, status, task_id, user_id]);
        return task.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteTaskServices = async (task_id, user_id) => {
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [task_id, user_id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { getTasksServices, getTaskByIDServices, createTaskServices, updateTaskServices, deleteTaskServices };