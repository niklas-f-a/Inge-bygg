const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    workerName: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
    },
    done: {
      type: Boolean,
      default: false,
    },
    messages: [{ content: String, date: { type: Date, default: Date.now() } }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
