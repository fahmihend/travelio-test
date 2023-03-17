const booksRepository = require("../models/books.model.js");
const axios = require("axios");
const controller = {};

//function to get all the data from the database using try catch
controller.getData = async (req, res) => {
  try {
    let data;
    if (req.query.search && req.query.search !== "") {
      data = await booksRepository.find({
        title: req.query.search,
      });
    } else {
      data = await booksRepository.find();
    }
    res.render("wishlist", { data: data });
  } catch (err) {
    res.json({ message: err.message });
  }
};

//functiont to add book to wishlist using try catch
controller.postData = async (req, res) => {
  try {
    await booksRepository.create({
      title: req.body.title,
      authors: req.body.authors,
      thumbnailUrl: req.body.thumbnailUrl,
      rating: req.body.rating,
    });
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.send(err);
  }
};

//function to delete a data using try catch
controller.deleteData = async (req, res) => {
  try {
    await booksRepository.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.send(err);
  }
};

//function to get data from google apis
controller.getBook = async (req, res) => {
  try {
    const keyword = req.query.search;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword || "a"}`
    );
    const json = response.data;
    const books = json.items.map((item) => {
      const book = {
        bookId: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown",
        thumbnailUrl: item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.thumbnail
          : "",
        rating: item.volumeInfo.averageRating
          ? item.volumeInfo.averageRating
          : 0,
      };
      return book;
    });
    res.render("index", { data: books });
  } catch (err) {
    res.send(err);
  }
};

module.exports = controller;
