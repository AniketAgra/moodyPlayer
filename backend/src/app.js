const express  = require('express');
const songRoutes = require("../routes/song.routes.js");
const authRoutes = require('../routes/auth.routes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app= express()
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(cookieParser()); 
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', songRoutes);


module.exports = app;