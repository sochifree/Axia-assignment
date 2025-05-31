const express = require ("express")

const userRoute = require('./routes/user')

const mongoose = require('mongoose');
const db = require('./config/db')
require('dotenv').config();

const app = express();
const port = 3000

app.use(express.json())

mongoose.connect('mongodb+srv://sochimahenri:movie@movie.3csmx.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
 
app.use('/user', userRoute)

app.get('/',(req, res)=>{
   console.log('app is running')
   res.status(200).send('App is running')
})

app.listen(port, ()=>{
   console.log("app is running on port 3000")
})