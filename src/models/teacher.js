import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  subject: [{ type: String, enum: ["web", "oop"] }],
  email: { type: String, unique: true },
  ref_class: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  ref_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
