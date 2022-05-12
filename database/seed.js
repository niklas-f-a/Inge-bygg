require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('../models/Tasks');
const User = require('../models/Users');
const fs = require('fs')
const path = require('path')

async function seed() {
  await mongoose.connect(process.env.DATABASE_URL);

  await Task.collection.drop()
  await User.collection.drop()


  await User.create({
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

  await Task.insertMany([
    {
      task: 'Fixa badkar',
      imageLink: 'sanibell-bv-mFQo2uJNf2c-unsplash.jpg',
      client: client._id,
      worker: worker._id,
    },
    {
      task: 'Riva väggar',
      imageLink: 'sanibell-bv-mFQo2uJNf2c-unsplash.jpg',
      client: client._id,
      worker: worker._id,
    },
    {
      task: 'Fixa elskåpet',
      imageLink: 'sanibell-bv-mFQo2uJNf2c-unsplash.jpg',
      client: client._id,
      worker: worker._id,
    },
  ]);

  mongoose.connection.close();
}

seed();
