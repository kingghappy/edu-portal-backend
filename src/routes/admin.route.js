import express from "express";
import AdminController from "../controllers/admin.controller.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = express.Router();

const adminController = new AdminController()

router.get("/all", adminController.all);
router.get("/all-email", adminController.allEmail);
router.get("/find", adminController.findUserById);
router.post("/add", adminController.importDataUser);
router.post("/update", adminController.updateDataUser);
router.post("/update-all", adminController.updateManyData);
router.post("/delete", adminController.deleteDataUser);
router.post("/delete-all", adminController.deleteFilterUser);

router.use(errorHandler);


export default router;
