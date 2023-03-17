const express = require('express');
const router = express.Router();
const controller = require('../controllers/books.controller.js');

//api routes
router.post('/', controller.postData);
router.get('/wishlist', controller.getData);
router.get('/book', controller.getBook);
router.delete('/delete/:id', controller.deleteData);

module.exports = router;