const { Router } = require('express');
const router = new Router();
const TaskController = require('../controllers/TaskController');
const Auth = require('../middleware/auth');
const fileUpload = require('express-fileupload');
const ImageController = require('../controllers/ImageController');
const Validate = require('../validators');


router.get('/',
  Auth.authRoles('worker', 'client', 'admin'),
  TaskController.getAll
);

router.get('/:id',
  Auth.authRoles('worker', 'admin', 'client'),
  TaskController.getTask
);

router.post('/',
  Auth.authRoles('worker'),
  Validate.handleTask,
  TaskController.createTask
);

router.delete('/:id',
  Auth.authRoles('admin'),
  TaskController.deleteTask
);

router.patch('/:id',
  Auth.authRoles('worker'),
  Validate.handleTask,
  TaskController.updateTask
);

router.put('/:id/messages',
  Auth.authRoles('worker', 'client'),
  Validate.addMessage,
  TaskController.addMessage
);

router.get('/:id/messages',
  Auth.authRoles('worker', 'client', 'admin'),
  TaskController.getMessages
);

router.delete('/:taskId/messages/:messageId',
  Auth.authRoles('worker', 'client'),
  TaskController.deleteMessage
);

router.post('/:id/images',
  fileUpload({
    limits: {fileSize: 5242880},
    abortOnLimit: true,
    responseOnLimit: JSON.stringify('File size must be less than 5mb')
  }),
  Auth.authRoles('worker', 'client', 'admin'),
  Validate.addImage,
  ImageController.addImage
);

router.get('/:id/images',
  Auth.authRoles('worker', 'client', 'admin'),
  ImageController.getImage
)

module.exports = router;
