import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  ref_class: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  ref_score: { type: mongoose.Schema.Types.ObjectId, ref: "Score" },
  isActive: { type: Boolean, default: true },
  email: { type: String, unique: true },
  ref_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
