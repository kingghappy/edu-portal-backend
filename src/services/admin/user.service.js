import models from "../../utils/types.js";
import User from "../../models/user.js";

// Hàm kiểm tra role và trả về model tương ứng
const withValidModel = async (role, handler) => {
  const model = models[role];
  if (!model) throw new Error("Invalid Role !!");
  return await handler(model);
};

const getAllService = async (role, select) =>
  await withValidModel(
    role,
    async (model) => await model.find().select(select || "-password")
  );

const importDataService = async (role, data, defaultPassword = "123456") =>
  await withValidModel(role, async (model) => {
    const profiles = await model.insertMany(data);

    const users = await Promise.all(
      profiles.map(async (profile) => {
        const userData = {
          email: profile.email,
          password: defaultPassword,
          role: role,
          ref_profile: profile._id,
          profileModel: role.replace(/^./, role[0].toUpperCase()),
        };
        return await User.create([userData]);
      })
    );

    await Promise.all(
      profiles.map((profile, index) => {
        return model.findByIdAndUpdate(profile._id, {
          ref_user: users[index][0]._id,
        });
      })
    );
    return {
      profiles,
      users: users.flat(),
    };
  });

const findUserService = async (role, ref_id) =>
  await withValidModel(role, async (model) => await model.findById(ref_id));

const deleteUserService = async (role, ref_id) =>
  await withValidModel(
    role,
    async (model) => await model.findByIdAndDelete(ref_id)
  );

const deleteManyUserService = async (role, filter) =>
  await withValidModel(role, async (model) => {
    await model.deleteMany(filter);
    await model.collection.drop();
  });

const updateUserService = async (role, ref_id, data) =>
  await withValidModel(
    role,
    async (model) =>
      await model.findByIdAndUpdate(ref_id, { $set: data }, { new: true })
  );

const updateManyUserService = async (role, filter) =>
  await withValidModel(role, async (model) => await model.updateMany(filter));

export {
  getAllService,
  importDataService,
  findUserService,
  deleteUserService,
  deleteManyUserService,
  updateUserService,
  updateManyUserService,
};
