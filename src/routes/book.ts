import express from "express";
import controller from "../controllers/book";

const router = express.Router();

router.get("/get/books", controller.getAllBooks);
router.get("/get/books/:id", controller.getById);
router.post("/post/books", controller.createBook);
router.patch("/update/books/:id", controller.updateBook)
router.delete("/delete/books/:id", controller.deleteBook)

export = router;
