import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
const models = require('../models')

const NAMESPACE = "Books";

const createBook = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Creating Book')

  let { author, title } = req.body

  let book = {
    author,
    title
  };

  models.Book.create(book)
    .then((result: any) => res.status(201).json({
      message: "Book Created successfully",
      post: result
    })
    )
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err)

      return res.status(500).json({
        message: "ERROR: Book not Created",
        error: err
      })
    })

}

const getById = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Getting by Id`);

  const id = req.params.id;

  models.Book.findByPk(id)
    .then((result: any) => res.status(200).json(result))
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err)

      return res.status(500).json({
        message: "ERROR: ID not founded",
        error: err
      })
    })

}

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Getting all Books`);

};

export default { getAllBooks, createBook, getById };
