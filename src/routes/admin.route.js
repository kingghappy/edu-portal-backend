import express from "express";
import {
  getAll,
  getAllEmail,
  importData,
  findUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  updateManyUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/all", getAll);
router.get("/all-email", getAllEmail);
router.get("/find", findUser);
router.post("/add", importData);
router.post("/update", updateUser);
router.post("/update-all", updateManyUser);
router.post("/delete", deleteUser);
router.post("/delete-all", deleteManyUser);

export default router;
