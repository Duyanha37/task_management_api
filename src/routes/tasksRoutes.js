const auth = require('../middlewares/authorization');
const {getTasks, getTaskByID, createTask, updateTask, deleteTask} = require('../controllers/tasksControllers');
const router = require('express').Router();

router.get('/', auth, getTasks);

router.get('/:id', auth, getTaskByID);

router.post('/', auth, createTask);

router.put('/:id', auth, updateTask);

router.delete('/:id', auth, deleteTask);

module.exports = router;