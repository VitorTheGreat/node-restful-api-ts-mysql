import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Books";

const createBook = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Creating Book");

  let { author, title } = req.body;

  let book = {
    author,
    title,
  };

  let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          return res.status(200).json({
            result,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(500).json({
            message: error.message,
            error,
          });
        })
        .finally(() => connection.end());
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Getting all Books`);

  let query = "SELECT * FROM books";

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return res.status(200).json({
            results,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(500).json({
            message: error.message,
            error,
          });
        })
        .finally(() => connection.end());
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { getAllBooks, createBook };
