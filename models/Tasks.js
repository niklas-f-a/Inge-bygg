const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
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
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  client: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  worker: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hashSync(this.password, 10);
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
