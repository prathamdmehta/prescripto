import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

// ✅ Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("🔍 Received Forgot Password Request for:", email);

    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Generate reset token & set expiration
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour

    console.log("📝 Generating Reset Token:", resetToken);

    // Use `findOneAndUpdate` to ensure MongoDB updates correctly
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { resetPasswordToken: resetToken, resetPasswordExpires },
      { new: true }
    );

    console.log("✅ Updated User:", updatedUser);

    // Send email with reset link (using nodemailer)
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    console.log(`📩 Sending reset email to ${email} with link: ${resetLink}`);

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    return res.status(500).json({ message: "Server error, please try again!" });
  }
});

// ✅ Reset Password Route
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log("Received Token:", token);
    console.log("Received New Password:", newPassword);

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required!" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensures token is still valid
    });    
    
    console.log("🔍 User Found:", user);
    
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token!" });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null; // Clear the token after reset
    await user.save();

    return res.json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
