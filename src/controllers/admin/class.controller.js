import { addClassService, findClassService } from "../../services/admin/class.service";

const handleRequest = async (res, serviceCall) => {
  try {
    const result = await serviceCall();
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const addClass = (req, res) => {
    const {data} = req.body 
    handleRequest(res, async () => await addClassService(data).then((data) => ({ data })))
}

const findClass = (req, res) => {
    const {id} = req.query
    handleRequest(res, async () => await findClassService(id).then((data) => ({ data })))
}

export {
    addClass,
    findClass
}