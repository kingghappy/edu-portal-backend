import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18, max: 25 },
  class: { type: String },
  gpa: { type: Number, min: 0, max: 4 },
  isActive: { type: Boolean, default: true },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
