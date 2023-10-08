import express from 'express';
import usersRouter from './routes/users.router.js';
import businessRouter from './routes/business.router.js';
import ordersRouter from './routes/orders.router.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()

const MONGODB_CONNECT = `mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase29?retryWrites=true&w=majority`
const connection = mongoose.connect(
  MONGODB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log('Conectado a MongoDB')
  })
  .catch((error)=>{
    console.error('Error al conectar a MongoDB', error)
  })

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(cors({origin: 'http://localhost:5500', methods: ['GET', 'POST', 'PUT', 'DELETE']}))
app.use(cors())

app.use('/api/users', usersRouter);
app.use('/api/business', businessRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT||8080

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})