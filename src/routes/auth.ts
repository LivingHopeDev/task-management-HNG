import {
  SignUpSchema,
  loginSchema,
  otpSchema,
  resendOtpSchema,
  resetPasswordSchema,
} from "../schema";
import { validateData } from "../middlewares";
import {
  signup,
  login,
  verifyOtp,
  resendOtp,
  forgetPassword,
  resetPassword,
} from "../controllers";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/register", validateData(SignUpSchema), signup);
authRoute.post("/login", validateData(loginSchema), login);
authRoute.post("/verify-otp", validateData(otpSchema), verifyOtp);
authRoute.post("/resend-otp", validateData(resendOtpSchema), resendOtp);
authRoute.post(
  "/forget-password",
  validateData(resendOtpSchema),
  forgetPassword
);
authRoute.post(
  "/reset-password",
  validateData(resetPasswordSchema),
  resetPassword
);

export { authRoute };
