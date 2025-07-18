import Subject from "../../models/subject.js"

const addSubjectService = async(data) => {
    const {name, image} = data
    if(!name || !image) throw new Error("Please fill all fieds")

    const newSubject = new Subject({
        name, image
    })

    return await newSubject.save()
}

const findSubjectService = async(id) => {
    return await Subject.findById(id)
}

export {
    addSubjectService,
    findSubjectService
}