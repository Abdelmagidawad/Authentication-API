// Routes => all endpoints

import express from "express";
import { registerUsers, loginUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUsers);

router.post("/login", loginUser);

export default router;
