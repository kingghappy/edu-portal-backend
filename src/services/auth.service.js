import jwt from 'jsonwebtoken'

import User from "../models/user.js"
import { comparePass } from '../config/Middleware/hashpasswrod.js'

const loginUser = async (email, password) => {

    //find user by email
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not exist !!")

    //check if user doing
    const isUser = await comparePass(password, user.password)
    if (!isUser) throw new Error("Wrong password !!")

    //respone token to client
    const token = jwt.sign({ email: user.email, role: user.role, ref_profile: user.ref_profile },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    return { token }

}

const logoutUser = () => {
    return { message: "Logout successful. Please remove the token on client side." };
};

export {
    loginUser,
    logoutUser
}