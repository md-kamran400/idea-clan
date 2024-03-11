const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/User"); // Corrected import

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User already registered" });
    } else {
      bcrypt.hash(req.body.password, 10, async (error, hash) => {
        if (hash) {
          const newUser = new userModel({
            ...req.body,
            password: hash,
          });
          await newUser.save();
          res.status(200).json({ msg: "User registered successfully" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id }, "kamran");
          res.status(200).json({ msg: "User logged in successfully", token });
        } else {
          res.status(200).json({ msg: "Incorrect password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { userRouter };
