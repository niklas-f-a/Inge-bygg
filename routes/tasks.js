const { Router } = require('express');
const router = new Router();
const TaskController = require('../controllers/TaskController');
const Auth = require('../middleware/auth');
const fileUpload = require('express-fileupload');
const imageController = require('../controllers/imageController');

router.get(
  '/',
  Auth.authRoles(['worker', 'client', 'admin']),
  TaskController.getAll
);

router.get('/:id', Auth.authRoles(['worker', 'admin']), TaskController.getTask);

router.post('/', Auth.authRoles(['worker']), TaskController.createTask);

router.delete('/:id', Auth.authRoles(['admin']), TaskController.deleteTask);

router.patch('/:id', Auth.authRoles(['worker']), TaskController.updateTask);

router.put(
  '/:id/messages',
  Auth.authRoles(['worker', 'client']),
  TaskController.addMessage
);

router.get(
  '/:id/messages',
  Auth.authRoles(['worker', 'client']),
  TaskController.getMessages
);

router.post(
  '/:id/images',
  fileUpload({ useTempFiles: true }),
  Auth.authRoles(['worker', 'client']),
  imageController.addImage
);

module.exports = router;
