const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config();

const connectDB = require('./config/db');

connectDB();

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(process.env.PORT, () => {
    console.log(`server running: ${process.env.PORT}`)
})