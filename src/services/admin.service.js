import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
import User from "../models/user.js";

const models = {
  student: Student,
  teacher: Teacher,
  user: User
};

export {
    models
}