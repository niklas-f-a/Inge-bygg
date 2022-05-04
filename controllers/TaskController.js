const Task = require('../models/Tasks');
const { MissingCredentials, ResourceNotFound } = require('../error');

module.exports = {
  async getTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id)
        .populate('worker')
        .populate('client');

      // if (!task) throw new ResourceNotFound('Task');
      res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  },

  async addMessage(req, res, next) {
    try {
      const { content } = req.body;
      const { id } = req.params;
      console.log(req.user);
      const task = await Task.findById(id);
      // if (!task) {
      //   throw new ResourceNotFound("Task");
      // }
      task.messages.push({ content, sender: req.user.name });
      task.save();
      res.status(200).json({ message: 'Message added', task });
    } catch (error) {
      next(error);
    }
  },

  async getMessages(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      // if (!task) {
      //   throw new ResourceNotFound("Task");
      // }
      res.status(200).json({ Messages: task.messages });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      let tasks;
      if (req.user.role == 'client') {
        tasks = await Task.find({ client: req.user.id })
          .populate('worker')
          .populate('client');
      } else if (req.user.role == 'worker') {
        tasks = await Task.find({ worker: req.user.id })
          .populate('worker')
          .populate('client');
      } else if (req.user.role == 'admin') {
        tasks = await Task.find().populate('worker').populate('client');
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
      const task = {
        task: req.body.task,
        imageLink: req.body.imageLink,
        client: req.body.clientId,
        worker: req.body.workerId,
      };
      if (!task.task || !task.client || !task.worker) {
        throw new MissingCredentials(['task', 'clientId', 'workerId']);
      }
      if (!task.client) {
        throw new ResourceNotFound('Client');
      }
      const newTask = await Task.create(task);
      res.status(200).json({ message: 'Task created', newTask });
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
      // if (!task) {
      //   throw new ResourceNotFound('Task');
      // }
      res.status(200).json({ message: 'Task updated', task: { task } });
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const task = await Task.findByIdAndRemove(req.params.id);
      // if (!task) throw new ResourceNotFound('Task');
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      next(error);
    }
  },
};
