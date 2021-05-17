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
    .then((result: any) => {
      if(!result) {
        res.status(404).json({message: "Book not found"})
      }
      res.status(200).json(result)
    })
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

  models.Book.findAll()
    .then((results: any) => res.status(200).json({ results }))
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err)

      return res.status(500).json({
        message: "ERROR: ID not founded",
        error: err
      })
    })

};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Updating a book`);

  const id = req.params.id;

  let { author, title } = req.body

  const updatedInfo = {
    author,
    title
  };

  models.Book.update(updatedInfo, { where: { id } })
    .then((result: any) => res.status(200).json({ result })) //? the result here, returns a boolean value!
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err)

      return res.status(500).json({
        message: "ERROR: Book not updated",
        error: err
      })
    })

}

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Deleting a book`);

  const id = req.params.id;

  models.Book.destroy({ where: { id } })
    .then((result: any) => res.status(200).json({ result })) //? the result here, returns a boolean value!
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err)

      return res.status(500).json({
        message: "ERROR: Book not deleted",
        error: err
      })
    })
}

export default { getAllBooks, createBook, getById, updateBook, deleteBook };
