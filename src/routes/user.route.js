import express from "express";
import { getProfile, changePass } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", getProfile);
router.put("/change-pass", changePass);

export default router;
