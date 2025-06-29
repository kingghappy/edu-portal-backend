export default class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // Sử dụng arrow function để tự động bind 'this'
  getProfile = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const userData = await this.userService.getProfile(token);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  changePass = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        throw new AppError("Both passwords are required", 400);
      }

      const result = await this.userService.changePass(
        token, 
        currentPassword, 
        newPassword
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}