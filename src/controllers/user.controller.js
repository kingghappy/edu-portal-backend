import jwt from "jsonwebtoken";

import User from "./../models/user.js";
import { comparePass } from "../config/Middleware/hashpasswrod.js";
import { changePassUser, profileUser } from "../services/user.service.js";

const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const { userData } =await profileUser(token)
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
 
  try {
    const result = await changePassUser(token, currPass, newPass)
    res.status(200).json(result)

  } catch (error) {
    console.log("error in changep password: ", error.message)
    res.json({ error: error.message })
  }
};

export { getProfile, changePass };
