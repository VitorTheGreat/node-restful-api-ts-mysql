import express from "express";
import controller from "../controllers/book";

const router = express.Router();

router.get("/get/books", controller.getAllBooks);
router.post("/post/books", controller.createBook);

export = router;
