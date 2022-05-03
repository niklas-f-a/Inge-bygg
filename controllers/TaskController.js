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
      let tasks;
      if (req.user.role == 'client') {
        tasks = await Task.find({ client: req.user._id }).populate('worker');
      } else if (req.user.role == 'worker') {
        tasks = await Task.find({ worker: req.user._id }).populate('client');
        console.log(tasks);
      } else if (req.user.role == 'admin') {
        tasks = await Task.find();
        console.log(tasks);
      }
      res.status(200).json({
        results: tasks.length,
        tasks,
      });
    } catch (error) {
      next(error);
    }
  },

  async createTask(req, res, next) {
    try {
      const task = await Task.create(req.body);
      res.status(200).json({ message: 'Task created', task: { task } });
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
      res.status(200).json({ message: 'Task updated', task: { task } });
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req, res, next) {
    try {
      await Task.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      next(error);
    }
  },
};
