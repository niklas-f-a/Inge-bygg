const { Router } = require('express');
const router = new Router();
const TaskController = require('../controllers/TaskController');
const Auth = require('../middleware/auth');
//authenticate user depending on role

router.get('/', Auth.admin, TaskController.getAll);

router.get('/:id', Auth.admin, TaskController.getTask);

router.delete('/:id', Auth.admin, TaskController.delete);

router.patch('/:id', Auth.worker, TaskController.update);

module.exports = router;
