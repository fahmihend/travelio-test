const express = require('express');
const connection = require('./connection');
const bodyParser = require('body-parser');
const app = express();

connection();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set ejs view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))

//set router
const booksRoutes = require('./routes/books.routes.js');
app.use('/', booksRoutes);


module.exports = app;