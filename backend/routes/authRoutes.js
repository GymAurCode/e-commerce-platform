// Auth Routes
import express from "express";
import { body } from "express-validator";
import { 
  registerUser, 
  loginUser, 
  getProfile, 
  forgotPassword, 
  resetPassword 
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc  Register new user (default role: User)
 * @access Public
 */
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required")
      .custom((value) => {
        if (!value.endsWith("@gmail.com")) {
          throw new Error("Email must be in @gmail.com format");
        }
        return true; // ✅ Important
      }),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ characters"),
  ],
  registerUser
);

/**
 * @route POST /api/auth/login
 * @desc  Login user and get JWT token
 * @access Public
 */
router.post(
  "/login",
  [
    body("email", "Valid email is required").isEmail(),
    body("password", "Password is required").exists(),
  ],
  loginUser
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send reset password link
 * @access  Public
 */
router.post("/forgot-password", forgotPassword);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password
 * @access  Public
 */
router.post("/reset-password/:token", resetPassword);

/**
 * @route   GET /api/auth/profile
 * @desc    Get logged-in user's profile
 * @access  Private
 */
router.get("/profile", authMiddleware, getProfile);

export default router;
