import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Email or password is missing, please enter both",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user, email doesn't exist",
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const tokenData = { id: user._id };
    const token = jwt.sign(tokenData, "askdfjkasdflk", { expiresIn: "1d" });
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        user,
        message: `Welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failed, please try again",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please enter all fields to register",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "This email is already used",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({ name, email, password: hashedPassword });
    return res.status(200).json({
      success: true,
      message: "User account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Registration failed, please try again",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, "askdfjkasdflk");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
