// Controller => Logic

import users from "../models/userModel.js";
import bcrypt from "bcrypt";

// @docs Register a new user
// @route /auth/register
// @method POST

const registerUsers = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const existUser = users.find((user) => user.userName === userName);
    if (existUser) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ userName, password: hashedPassword });
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @docs Login User
// @route /auth/login
// @method POST

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const findUser = users.find((user) => user.userName === userName);
    if (!findUser) {
      return res.status(404).json({ message: "Invalid Username or Password" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      res.status(200).json({ message: "Login Successfully" });
    } else {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { registerUsers, loginUser };
