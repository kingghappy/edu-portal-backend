import jwt from "jsonwebtoken";

import { models } from "./admin.controller.js";
import User from "./../models/user.js";
import { comparePass } from "../config/Middleware/hashpasswrod.js";

const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("Not have token !!");
    res.status(302).json({ message: "not have token !!" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const model = models[decode.role];

    const userData = await model.findById(decode.refId).select("-_id");

    res.status(200).json({ userData });
  } catch (error) {
    console.log("error in get profile: ", error.message);
    res.status(400).json({ error: error.message });
  }
};


const changePass = async (req, res) => {
  const { currPass, newPass } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  //check token
  if (!token) res.status(301).json({ message: "not have token" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    //check decode
    if (!decode) res.status(301).json({ message: "invalid token" });

    const user = await User.findOne({ email: decode.email });

    //check user
    if (!user) res.status(301).json({ message: "User not exist" });

    const isUser = await comparePass(currPass, user.password);

    //check own user
    if (!isUser) res.status(301).json({ message: "wrong password" });

    //update pass
    user.password = newPass
    await user.save()

    console.log("Update password success !!")
    res.status(200).json({message: "Update password success !!"})

  } catch (error) {
    console.log("error in changep password: ", error.message)
    res.json({error: error.message})
  }
};

export { getProfile, changePass };
