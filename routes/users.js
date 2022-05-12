const { Router } = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');
const Auth = require('../middleware/auth');
const Validate = require('../validators')

router.post('/login',
  Validate.login,
  UserController.login
);

router.post('/',
  Auth.authRoles('admin'),
  Validate.register,
  UserController.register
);

router.get('/me',
  Auth.authRoles('admin', 'worker', 'client'),
  UserController.getAccount
);

router.get('/:id',
  Auth.authRoles('admin', 'worker'),
  UserController.getUser
);

router.get('/',
  Auth.authRoles('admin'),
  UserController.getAll
);

router.patch('/:id',
  Auth.authRoles('client', 'worker'),
  //add validations
  UserController.update
);

router.delete('/:id',
  Auth.authRoles('admin'),
  UserController.delete
);

module.exports = router;
