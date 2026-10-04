import express from "express";
import { register, login, logout, getMe } from "../controllers/register.js";

const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", getMe);

export default router;
