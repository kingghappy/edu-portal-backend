import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import { models } from './admin.service.js'
import { comparePass } from '../config/Middleware/hashpasswrod.js'



const profileUser = async (token) => {

    //check token is exist
    if (!token) throw new Error("Not have token !!")

    //check valid token
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (!decode) throw new Error("Invalid token !!")

    //check type of user by object key
    const model = models[decode.role]

    //find user by refId
    const userData = await model.findById(decode.refId).select("-_id")

    return { userData }
}

const changePassUser = async (token, currPass, newPass) => {

    //check token exist
    if (!token) throw new Error("Token not exist !!")

    //check token valid
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) throw new Error("Invalid token !!")


    //find user by refId
    const user = await User.findOne({ refId: decode.refId })
    if (!user) throw new Error("User not exist !!")

    //check user is changing password
    const isUser = await comparePass(currPass, user.password)
    if (!isUser) throw new Error("Wrong password !!")

    //update password
    user.password = newPass
    await user.save()

    return { message: "Update password success !!" }
}

export {
    profileUser,
    changePassUser
}