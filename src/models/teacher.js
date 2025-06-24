import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  subject: { type: String, enum: ["Math", "Physics", "Chemistry", "Biology"] },
  email: { type: String, unique: true },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
