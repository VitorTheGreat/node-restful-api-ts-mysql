import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.post("/sing-up", controller.verifyEmail);
router.post("/login", controller.loginUser);

export = router;
