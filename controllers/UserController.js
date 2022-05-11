const User = require('../models/Users');
const { ResourceNotFound } = require('../error');

module.exports = {
  async login(req, res, next) {
    try {
      const token = await User.authenticate(req.body);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  },

  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const user = await User.create({ name, email, password, role });
      res.status(201).json({
        message: 'User created',
        user: {
          id: user._id,
          name,
          email,
          role,
        },
      });
    } catch (error) {
      if (error.message.indexOf('11000') != -1) {
        res.status(409).json({ message: 'User already exists' });
      } else {
        next(error);
      }
    }
  },

  async getAccount(req, res, next) {
    try {
      const { name, email, role, id } = req.user;
      res.status(200).json({ user: name, email, role, id });
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new ResourceNotFound('User');
      }
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const maxPageSize = 10;
      const page = req.query.page || 1;
      let pageSize = req.query.pageSize || 10;
      if (pageSize > maxPageSize) {
        pageSize = 10;
      }
      const users = await User.find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      res.status(200).json({
        results: users.length,
        users,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id,
        {
        name: req.body.name,
        email: req.body.email
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user) {
        throw new ResourceNotFound('User');
      }
      res.status(200).json({ message: 'User updated', user });
    } catch (error) {
      next(error);
    }
  },


  async delete(req, res, next) {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        throw new ResourceNotFound('User');
      }
      res.status(200).json({ message: 'User is no more' });
    } catch (error) {
      next(error);
    }
  },
};
