import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/envConfig";
import Validator from "fastest-validator";

const models = require("../models");

const NAMESPACE = "USER";

const validateFields = (fields: object) => {
  const v = new Validator();

  const schema = {
    name: { type: "string", max: "30", optional: true, nullable: true },
    email: { type: "string", max: "30", optional: false, nullable: false },
    password: { type: "string", optional: false, nullable: false },
  };

  return v.validate(fields, schema);
};

const verifyEmail = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Verifying email");

  models.User.findOne({ where: { email: req.body.email } })
    .then((result: any) =>
      result
        ? res.status(409).json({ message: "Email already registered!" })
        : singUp(req, res, next)
    )
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err);

      return res.status(500).json({
        message: "ERROR verifying Email",
        error: err,
      });
    });
};

const singUp = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Singing up");

  // encrypting password
  bcryptjs.genSalt(10, (err: any, salt: any) => {
    bcryptjs.hash(req.body.password, salt, (err: any, hash: any) => {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };

      const validationResponse = validateFields(user);

      if (validationResponse !== true) {
        //? The validator is not totally boolean, when not passed it returns a json about the error

        return res.status(400).json({
          message: "Validation Error",
          error: validationResponse,
        });
      }

      models.User.create(user)
        .then((result: any) =>
          res.status(201).json({
            message: "User Created successfully",
            post: result,
          })
        )
        .catch((err: any) => {
          logging.error(NAMESPACE, err.message, err);

          return res.status(500).json({
            message: "ERROR: User not Created",
            error: err,
          });
        });
    });
  });
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Logging In");

  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const validationResponse = validateFields(user);

  if (validationResponse !== true) {
    //? The validator is not totally boolean, when not passed it returns a json about the error

    return res.status(400).json({
      message: "Validation Error",
      error: validationResponse,
    });
  }

  models.User.findOne({ where: { email: req.body.email } })
    .then((user: any) => {
      user === null
        ? res.status(401).json({
            message: "Email not registered",
          })
        : bcryptjs.compare(
            req.body.password,
            user.password,
            (err: any, result: any) => {
              if (result) {
                const token = jwt.sign(
                  {
                    email: user.email,
                    userId: user.id,
                  },
                  config.jwtoken.key,
                  { expiresIn: '23h' },
                  (err: any, token: any) => {
                    res.status(200).json({
                      message: "Authentication successful!",
                      token,
                    });
                  }
                );
              } else {
                res.status(401).json({
                  message: "Invalid Credentials",
                });
              }
            }
          );
    })
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err);

      return res.status(500).json({
        message: "ERROR Logging in",
        error: err,
      });
    });
};

export default { verifyEmail, loginUser };
