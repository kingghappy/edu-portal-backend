import { AppError } from "../utils/AppError.js";
import UserRepo from "../repositories/user.repo.js";

export default class UserService {
  constructor(authService, models) {
    this.authService = authService;
    this.models = models;
    this.userRepo = (model) => new UserRepo(model);
  }

   getProfile = async (token) => {
    try {
      if (!token) throw new AppError("Authorization required", 401);
      
      const decoded = this.authService.verifyToken(token);
      if (!decoded?.role || !decoded?.refId) {
        throw new AppError("Malformed token", 400);
      }

      const model = this.models[decoded.role];
      if (!model) throw new AppError("Invalid user role", 403);

      const userData = await this.userRepo(model).findById(decoded.refId);
      if (!userData) throw new AppError("User not found", 404);

      return userData;
    } catch (error) {
      throw new AppError(`Profile fetch failed: ${error.message}`, error.statusCode || 500);
    }
  }

  changePass = async (token, currPass, newPass) => {
    try {
      const decoded = this.authService.verifyToken(token);
      const model = this.models[decoded.role];
      const user = await this.userRepo(model).findById(decoded.refId);

      if (!(await comparePass(currPass, user.password))) {
        throw new AppError("Current password is incorrect", 403);
      }

      await this.userRepo(model).updatePass(decoded.refId, newPass);
      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      throw new AppError(`Password change failed: ${error.message}`, error.statusCode || 500);
    }
  }
}