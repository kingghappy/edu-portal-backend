import Class from "../../models/class.js";

const addClassService = async (data) => {
  const { name, subject, teacher_id, students_id } = data;

  if (!name || !subject || !teacher_id || !students_id)
    throw new Error("Please fill all fields");

  const newClass = new Class({
    name,
    ref_subject: subject,
    ref_teacher: teacher_id,
    ref_studentsstudents_id,
  });

  return await newClass.save();
};

const findClassService = async(id) => {
    return await Class.findById(id)
}

export { addClassService, findClassService };
