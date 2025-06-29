import AdminService from "../services/admin.service.js";
import models from "../config/types/models.js";

export default class AdminController {
  constructor() {
    this.adminService = (model) => new AdminService(model);
  }

  allEmail = async (req, res, next) => {
    const { model } = req.body;
    const type = models[model];
    try {
      const data = await this.adminService(type).allEmail();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  all = async (req, res, next) => {
    const { model } = req.body;
    const type = models[model];
    try {
      const data = await this.adminService(type).all();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  importDataUser = async (req, res, next) => {
    const { data, model } = req.body;
    const type = models[model];

    try {
      const importData = await this.adminService(type).importDataUser(data);
      res.status(200).json({ importData });
    } catch (error) {
      next(error);
    }
  };

  findUserById = async (req, res, next) => {
    const { refId, model } = req.body;
    const type = models[model];

    try {
      const user = await this.adminService(type).findUserById(refId);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  deleteDataUser = async (req, res, next) => {
    const { refId, model } = req.body;
    const type = models[model];

    try {
      const userDelete = await this.adminService(type).deleteDataUser(refId);
      res.status(200).json({ userDelete });
    } catch (error) {
      next(error);
    }
  };

  deleteFilterUser = async (req, res, next) => {
    const { filter, model } = req.body;
    const type = models[model];

    try {
      const { message } = await this.adminService(type).deleteFilterUser(
        filter
      );
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };

  updateDataUser = async (req, res, next) => {
    const { refId, data, model } = req.body;
    const type = models[model];

    try {
      const newData = await this.adminService(type).updateDataUser(refId, data);
      res.status(200).json({ newData });
    } catch (error) {
      next(error);
    }
  };

  updateManyData = async (req, res, next) => {
    const { filter, model } = req.body;
    const type = models[model];

    try {
      const { message } = await this.adminService(type).updateManyData(filter);
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
}
