const Task = require('../models/Tasks');

module.exports = {
  async getTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const tasks = await Task.find({});
      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  },

  async createTask(req, res, next) {
    try {
      const task = await Task.create(req.body);
      res.status(200).json({ message: 'Task created' });
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req, res, next) {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({ message: 'Task updated' });
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      await Task.deleteOne({ id });
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      next(error);
    }
  },
};
