require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('../models/Tasks');
const User = require('../models/Users');

async function seed() {
  await mongoose.connect(process.env.DATABASE_URL);

  await Task.collection.drop()
  await User.collection.drop()


  const admin = await User.create({
    name: 'Kalle Admin',
    email: 'kalle@admin.com',
    role: 'admin',
    password: 'password',
  });

  const worker = await User.create({
    name: 'Pelle Worker',
    email: 'pelle@worker.com',
    role: 'worker',
    password: 'password',
  });

  const client = await User.create({
    name: 'Klara Client',
    email: 'klara@client.com',
    role: 'client',
    password: 'password',
  });

  const tasks = await Task.insertMany([
    {
      task: 'Fixa badkar',
      imageLink: 'www.badkar.se',
      client: client._id,
      worker: worker._id,
    },
    {
      task: 'Riva väggar',
      imageLink: 'www.vaggar.se',
      client: client._id,
      worker: worker._id,
    },
    {
      task: 'Fixa elskåpet',
      imageLink: 'www.skap.se',
      client: client._id,
      worker: worker._id,
    },
  ]);

  mongoose.connection.close();
}

seed();
