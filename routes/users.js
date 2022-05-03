const { Router } = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');
const Auth = require('../middleware/auth');
//authenticate user depending on role, use as middleware where needed

router.post('/login',
  UserController.login
);

router.post('/',
  Auth.authRoles(['admin']),
  UserController.register
);

router.get('/:id',
  Auth.authRoles(['admin', 'worker']),
  UserController.getUser
);

router.get('/',
  Auth.authRoles(['admin']),
  UserController.getAll
);

router.delete('/:id',
  Auth.authRoles(['admin']),
  UserController.delete
);

module.exports = router;
