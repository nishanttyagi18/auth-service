require('dotenv').config();
const authRoutes = require('./routes/auth');
const homeRoute = require('./routes/home');
const express = require('express');
const app = express();


app.use(express.json())

app.use('/', authRoutes);
app.use('/user', homeRoute);

module.exports = app