const Task = require('../models/Tasks');
const User = require('../models/Users')
const { ResourceNotFound, Forbidden } = require('../error');

module.exports = {
  async getTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id)
        .populate('worker')
        .populate('client');
      if (!task) throw new ResourceNotFound('Task');
      if(task.client._id == req.user.id || task.worker._id == req.user.id){
        res.status(200).json({ task });
      }else{
        throw new Forbidden();
      }
    } catch (error) {
      next(error);
    }
  },

  async addMessage(req, res, next) {
    try {
      const { content } = req.body;
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        throw new ResourceNotFound('Task');
      }
      if(task.client == req.user.id || task.worker == req.user.id){
        task.messages.push({ content, sender: req.user.name });
        task.save();
        res.status(200).json({ message: 'Message added', task });
      }else{
        throw new Forbidden();
      }
    } catch (error) {
      next(error);
    }
  },

  async getMessages(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        throw new ResourceNotFound('Task');
      }
      if(task.client._id == req.user.id || task.worker._id == req.user.id){
        res.status(200).json({ Messages: task.messages });
      }else{
        throw new Forbidden();
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteMessage(req, res, next) {
    try {
      const { taskId, messageId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        throw new ResourceNotFound('Task');
      }
      const messageToDelete = task.messages.find((el) => el._id == messageId);

      if (!messageToDelete) {
        throw new ResourceNotFound('Message');
      }

      if(req.user == messageToDelete.sender){
        const index = task.messages.indexOf(messageToDelete);
        task.messages.splice(index, 1);
        task.save();
        res.status(200).json({ message: 'Message deleted', task });
      }else{
        throw new Forbidden();
      }
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
      const client = await User.findById(task.client)
      const worker = await User.findById(task.worker)
      if (!client) {
        throw new ResourceNotFound('Client');
      }
      if (!worker) {
        throw new ResourceNotFound('Worker');
      }
      const newTask = await Task.create(task);
      res.status(200).json({ message: 'Task created', newTask });
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req, res, next) {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!task) {
        throw new ResourceNotFound('Task');
      }
      res.status(200).json({ message: 'Task updated', task  });
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const task = await Task.findByIdAndRemove(req.params.id);
      if (!task) throw new ResourceNotFound('Task');
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      next(error);
    }
  },
};
