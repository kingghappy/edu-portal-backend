export default class UserRepo {
  constructor(model) {
    if (!model) throw new Error("Model is required");
    this.model = model;
  }

  async findById(refId) {
    try {
      return await this.model.findOne({ refId }).select("-_id -__v");
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async updatePass(refId, newPassword) {
    try {
      const result = await this.model.updateOne(
        { refId },
        { password: newPassword }
      );
      if (result.modifiedCount === 0) {
        throw new Error("No documents were updated");
      }
      return true;
    } catch (error) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }
}