import express from "express";
import { Book } from "../models/book-store-model.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ msg: "Please enter all the mentioned fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(200).send({ msg: "Book created!", book });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!", error });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res
      .status(400)
      .send({ msg: "Please enter all the mentioned fields" });
  }
  //Remember that this $set:req.body is helpfull when we only need to update the values mentioned by user
  //if user haven't filled all the data then it will update only mentioned fields!
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    if (!book) {
      return res.status(500).send({ msg: "Book not found!" });
    }
    res.status(200).send({ msg: "Book updated successfully!", data: book });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.send("Book not found!");
    res.status(200).send({ msg: "Book deleted!", book });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!", error });
  }
});

export default router;
