import express from "express";
import {
  getAll,
  importData,
  findUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  updateManyUser,
} from "../controllers/admin/user.controller.js";

import { addClass, findClass } from "../controllers/admin/class.controller.js";

const router = express.Router();

//user
router.get("/all", getAll);
router.get("/find", findUser);
router.post("/add", importData);
router.post("/update", updateUser);
router.post("/update-all", updateManyUser);
router.delete("/delete", deleteUser);
router.delete("/delete-all", deleteManyUser);

//class
router.post("/add-class", addClass);
router.get("/get-class", findClass);

//subject
router.post("/add-subject", addClass);
router.get("/get-subject", findClass);

export default router;
