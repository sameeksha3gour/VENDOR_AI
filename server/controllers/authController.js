const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==============================
// LOGIN
// ==============================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      console.log("USER NOT FOUND:", normalizedEmail);

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    console.log("USER FOUND:", user.email);
    console.log("USER ROLE:", user.role);

    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "User account is disabled.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==============================
// REGISTER / RESET ADMIN
// ==============================

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.findOne({
      email: normalizedEmail,
    });

    if (user) {
      user.name = name.trim();
      user.password = hashedPassword;
      user.role = "admin";
      user.isActive = true;

      await user.save();

      console.log("EXISTING USER RESET:", normalizedEmail);

      return res.status(200).json({
        success: true,
        message: "User credentials updated successfully.",
      });
    }

    user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("NEW ADMIN CREATED:", normalizedEmail);

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};