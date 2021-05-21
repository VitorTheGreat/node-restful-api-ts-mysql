import { Request, Response, NextFunction } from "express";
import config from "../config/envConfig";
import logging from "../config/logging";
import jwt from "jsonwebtoken";

const NAMESPACE = "MIDDLEWARE AUTH";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Checking Auth");

  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decodedToken = jwt.verify(token || "", config.jwtoken.key);

    req.userData = decodedToken;

    logging.info(NAMESPACE, "Checked Auth - OK");

    next();
  } catch (e) {
    logging.error(NAMESPACE, "ERROR Checking Auth");

    return res.status(401).json({
      message: "Invalid or expired token!",
      error: e,
    });
  }
};

export default { checkAuth };
