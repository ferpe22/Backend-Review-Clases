const express = require('express')
const mongoose = require('mongoose')
const MongoDAO = require('./dao/mongoDAO')
const MemoryDAO = require('./dao/memoryDAO')
const userDao = new MongoDAO()
//const userDao = new MemoryDAO()

const app = express()
mongoose.connect('mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase28?retryWrites=true&w=majority')

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String
})

const uerModel = mongoose.model('users', userSchema)

app.get('/users', async (req, res) => {
  const users = await userDao.getAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await userDao.get(req.params.id);
  if(user) {
      res.json(user);
  } else {
      res.status(404).send('User not found');
  }
});

app.post('/users', async (req, res) => {
  const newUser = await userDao.create(req.body);
  res.json(newUser);
});

app.put('/users/:id', async (req, res) => {
  const updatedUser = await userDao.update(req.params.id, req.body);
  if(updatedUser) {
      res.json(updatedUser);
  } else {
      res.status(404).send('User not found');
  }
});

app.delete('/users/:id', async (req, res) => {
  await userDao.delete(req.params.id);
  res.status(200).send('User deleted');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    date: new Date()
  })
})

const PORT = 8080
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))