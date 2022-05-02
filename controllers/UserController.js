const User = require('../models/Users');

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
          name: name,
          email,
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const users = await User.find({});
      res.status(200).json({
        results: users.length,
        users,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: 'User is no more' });
    } catch (error) {
      next(error);
    }
  },
};
