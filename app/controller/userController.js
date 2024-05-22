import bcrypt from "bcrypt";
import User from "../model/userModel.js";

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    return passwordHash;
  } catch (error) {
    res.status(400).send({ message: "Invalid password", error: error });
  }
};

export const create = async (req, res, next) => {
  try {
    const hashPassword = await securePassword(req.body.password);

    const userData = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      address: req.body.address,
      avatar: req.file.filename,
    });

    const { email } = userData;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//
export const fetch = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Interval Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Interval Server Error" });
  }
};

export const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Interval Server Error" });
  }
};
