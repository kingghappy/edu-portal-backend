import express from "express";
import {
  getAll,
  importData,
  findUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  updateManyUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/all", getAll);
router.get("/find", findUser);
router.post("/add", importData);
router.post("/update", updateUser);
router.post("/update-all", updateManyUser);
router.delete("/delete", deleteUser);
router.delete("/delete-all", deleteManyUser);

export default router;
