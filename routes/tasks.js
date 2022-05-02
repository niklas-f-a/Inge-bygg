const { Router } = require('express');
const router = new Router();
const TaskController = require('../controllers/TaskController');
const Auth = require('../middleware/auth');
//authenticate user depending on role

router.get('/', Auth.authRoles(['admin']), TaskController.getAll);

router.get('/:id', Auth.authRoles(['worker', 'admin']), TaskController.getTask);

router.post('/', Auth.authRoles(['worker']), TaskController.createTask);

router.delete('/:id', Auth.authRoles(['admin']), TaskController.deleteTask);

router.patch('/:id', Auth.authRoles(['worker']), TaskController.updateTask);

module.exports = router;
