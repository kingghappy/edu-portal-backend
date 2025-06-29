export default class AdminRepo {
  constructor(model) {
    if (!model) throw new Error("Model is required");
    this.model = model;
  }

  async allEmail() {
    return await this.model.find().select("email");
  }

  async all() {
    return await this.model.find().select("-password");
  }

  async importDataUser(data) {
    return await this.model.insertMany(data);
  }

  async findUserById(id) {
    return await this.model.findById(id);
  }

  async deleteDataUser(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteFilterUser(filter) {
    await this.model.deleteMany(filter);
    return { message: "Delete success !!" };
  }

  async updateDataUser(id, data) {
    return await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  }

  async updateManyData(filter) {
    await this.model.updateMany(filter);
    return { message: "Update success !!" };
  }
}
