import AdminRepo from "../repositories/admin.repo.js";

export default class AdminService {
  constructor(model) {
    this.model = model;
    this.adminRepo = (model) => new AdminRepo(model);
  }

  allEmail = async () => {
    return await this.adminRepo(this.model).allEmail();
  };

  all = async () => {
    return await this.adminRepo(this.model).all();
  };

  importDataUser = async (data) => {
    return await this.adminRepo(this.model).importDataUser(data);
  };

  findUserById = async (id) => {
    return await this.adminRepo(this.model).findUserById(id);
  };

  deleteDataUser = async (id) => {
    return await this.adminRepo(this.model).deleteDataUser(id);
  };

  deleteFilterUser = async (filter) => {
    return await this.adminRepo(this.model).deleteFilterUser(filter);
  };

  updateDataUser = async (id, data) => {
    return await this.adminRepo(this.model).updateDataUser(id, data);
  };

  updateManyData = async (filter) => {
    return await this.adminRepo(this.model).updateManyData(filter);
  };
}
