export default class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error("All fields are require !!");

      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
