import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

// check type
const models = {
  student: Student,
  teacher: Teacher,
};

const getAll = async (req, res) => {
  const { type } = req.body;
  const model = models[type];
  try {
    const data = await model.find();
    res.json({ data });
  } catch (error) {
    console.log("error: ", error);
    res.json({ error });
  }
};

const importData = async (req, res) => {
  const { data, type } = req.body;

  const model = models[type];
  try {
    // add list of student data to db
    const result = await model.insertMany(data);
    console.log("Add data successfull !!");
    res.json(result);
  } catch (error) {
    console.log("Add error", error);
    res.json({ error });
  }
};

const findUser = async (req, res) => {
  const { type, id } = req.body;

  const model = models[type];
  try {
    const user = await model.findById(id);
    console.log("Get data success !!");
    res.json({ user });
  } catch (error) {
    console.log("error", error);
    res.json({ error });
  }
};

const deleteUser = async (req, res) => {
    const {type, id} = req.body

    const model = models[type]
    try {
        const deleteUser = await model.findByIdAndDelete(id)
        console.log('Delete success !!')
        res.json({deleteUser})
    } catch (error) {
        console.log('error', error)
        res.json({error})
    }
}

const updateUser = async (req, res) => {
  const { type, id, data } = req.body;
  const model = models[type];

  try {
    const dataNew = await model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    console.log('Update success !!')
    res.json({dataNew})
  } catch (error) {
    console.log('Update error: ', error)
    res.json({error})
  }
};

export { getAll, importData, findUser, updateUser, deleteUser};
