
// Auth Controller
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import crypto from 'crypto'
// import {sendEmail} from '../utils/email.js'

// Register User
export const registerUser = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({success: false, errors:errors.array()});

    const {name, email, password} = req.body;

    try{
        //Check if user exists
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({sucess: false, message:"Email already registered"});

        //Hash Password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        //create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role:"User", //default role
        });

        //Generate JWT
        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        });

        res.status(201).json({success: true, token, user:{id:user._id, name,email, role:user.role}});        
    }
    catch(err){
        console.error(err);
        res.status(500).json({success:false, message:"Server Error"});
    }
};

//Login User
export const loginUser = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({success:false, errors:errors.array()});

    const {email , password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user)
            return res.status(400).json({success:false, message:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({success:false, message: "Invalid credentials"});


        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",     
        });

        res.status(200).json({success:true, token, user:{id: user._id, name:user.name, email: user.email, role: user.role}})

    }catch(err){
        console.error(err);
        res.status(500).json({success: false , message: "Server Error"});

} 
};




// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'Email not found' });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save token and expiry in user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // Send token in response (we are not sending email)
    res.json({
      message: 'Email found, proceed to reset password',
      resetToken
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find user with token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Remove token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




// get logged-in user's profile
// Example
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
