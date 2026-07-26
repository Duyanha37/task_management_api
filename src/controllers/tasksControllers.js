const tasksServices = require('../services/tasksServices');

const getTasks = async (req, res) => {
    const user_id = req.user.id;
    
    let search = undefined;
    if (!req.query.search) {
        search = req.query.name;
    }

    try {
        const tasks = await tasksServices.getTasks(user_id, search);
        res.status(200).json({ tasks, message: 'Lấy danh sách công việc thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskByID = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await tasksServices.getTaskByID(id);
        if (!task) {
            return res.status(404).json({ message: 'Công việc không tồn tại' });
        }
        res.status(200).json({ task, message: 'Lấy công việc thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    const { categories_id, title, description, date, priority, status } = req.body;
    const user_id = req.user.id;
    
    try {
        const task = await tasksServices.createTask(user_id, categories_id, title, description, date, priority, status);
        if (!task) {
            return res.status(400).json({ message: 'Tạo công việc thất bại' });
        }
        res.status(201).json({ task, message: 'Tạo công việc thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    const task_id = req.params.id;
    const { categories_id, title, description, date, priority, status } = req.body;
    const user_id = req.user.id;

    try {
        const task = await tasksServices.updateTask(task_id, user_id, categories_id, title, description, date, priority, status);
        res.status(200).json({ task, message: 'Cập nhật công việc thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    const task_id = req.params.id;
    const user_id = req.user.id;

    try {
        await tasksServices.deleteTask(task_id, user_id);
        res.status(200).json({ message: 'Xóa công việc thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, getTaskByID, createTask, updateTask, deleteTask };