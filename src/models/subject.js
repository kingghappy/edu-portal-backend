import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {type: String, require: true, enum: ['web', "oop"]},
    iamge :{type: String , require: true}
})

const Subject = mongoose.model("Subject", subjectSchema)

export default Subject