import {
  getAllService,
  importDataService,
  findUserService,
  deleteUserService,
  deleteManyUserService,
  updateUserService,
  updateManyUserService,
} from "../services/admin.service.js";

// Hàm xử lý lỗi chung
const handleRequest = async (res, serviceCall) => {
  try {
    const result = await serviceCall();
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const getAll = (req, res) => {
  const { role, select } = req.query;
  handleRequest(res, async () => await getAllService(role, select).then((data) => ({ data })));
};

const importData = (req, res) => {
  const { data } = req.body;
  const { role } = req.query;
  handleRequest(res, async () =>
    await importDataService(role, data).then((result) => ({
      message: "Add data success",
      result,
    }))
  );
};

const findUser = (req, res) => {
  const { role, ref_id } = req.query;
  handleRequest(res, async () =>
    await findUserService(role, ref_id).then((user) => ({ user }))
  );
};

const deleteUser = (req, res) => {
  const { role, ref_id } = req.query;
  handleRequest(res, async () =>
    await deleteUserService(role, ref_id).then((deleted) => ({ deleted }))
  );
};

const deleteManyUser = (req, res) => {
  const { role, filter } = req.query;
  handleRequest(res,async () =>
    await deleteManyUserService(role, filter).then(() => ({
      message: "Delete all success!",
    }))
  );
};

const updateUser = (req, res) => {
  const { data } = req.body;
  const { role, ref_id } = req.query;
  handleRequest(res,async () =>
    await updateUserService(role, ref_id, data).then((dataNew) => ({ dataNew }))
  );
};

const updateManyUser = (req, res) => {
  const { role, filter } = req.query;
  handleRequest(res, async() =>
    await updateManyUserService(role, filter).then(() => ({
      message: "Update success !!",
    }))
  );
};

export {
  getAll,
  importData,
  findUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  updateManyUser,
};
