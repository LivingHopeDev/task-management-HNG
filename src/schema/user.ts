import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const otpSchema = z.object({
  token: z.string(),
});
export const resendOtpSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  new_password: z.string().min(6),
  confirm_password: z.string().min(6),
});
