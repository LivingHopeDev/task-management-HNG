import { IUserSignUp, IAuthService, IUserLogin } from "../types";
import { User } from "@prisma/client";
import { prismaClient } from "..";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateNumericOTP,
} from "../utils";
import {
  BadRequest,
  Conflict,
  ResourceNotFound,
  Unauthorised,
  Expired,
} from "../middlewares/error";
import { OtpService, EmailService } from ".";
import { Sendmail } from "../utils/sendMail";
import config from "../config";
export class AuthService implements IAuthService {
  private otpService = new OtpService();
  private emailService = new EmailService();
  public async signUp(payload: IUserSignUp): Promise<{
    message: string;
    user: Partial<User>;
  }> {
    const { email, password, username } = payload;
    const hashedPassword = await hashPassword(password);
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      throw new Conflict("User already exists");
    }
    const newUser = await prismaClient.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const otp = await this.otpService.createOtp(newUser.id);
    const { emailBody, emailText } =
      await this.emailService.verifyEmailTemplate(username, otp!.token);

    await Sendmail({
      from: config.GOOGLE_SENDER_MAIL,
      to: email,
      subject: "Email VERIFICATION",
      text: emailText,
      html: emailBody,
    });
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    return {
      user: userResponse,
      message:
        "User Created Successfully. Kindly check your mail for your verification token.",
    };
  }

  public async login(payload: IUserLogin): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
  }> {
    const { email, password } = payload;
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
      throw new ResourceNotFound("User not found");
    }
    if (!user.is_verified) {
      throw new Unauthorised(
        "Email verification required. Please verify your email to proceed."
      );
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequest("Authentication failed");
    }
    const access_token = await generateAccessToken(user.id);
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      user: userResponse,
      access_token,
      message: "Login successful",
    };
  }

  public async resendOTP(email: string) {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new ResourceNotFound("User not found");
    }
    if (user.is_verified) {
      return { message: "Email already verified" };
    }
    const token = generateNumericOTP(6);
    const otp_expires = new Date(Date.now() + 15 * 60 * 1000);

    const otp = await prismaClient.otp.create({
      data: {
        token: token,
        expiry: otp_expires,
        userId: user.id,
      },
    });
    const { emailBody, emailText } =
      await this.emailService.verifyEmailTemplate(user.username, otp!.token);

    await Sendmail({
      from: `${config.GOOGLE_SENDER_MAIL}`,
      to: email,
      subject: "Email VERIFICATION",
      text: emailText,
      html: emailBody,
    });
    return {
      message: "OTP sent successfully",
    };
  }

  public async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new ResourceNotFound("User not found");
    }

    const token = generateNumericOTP(6);
    const otp_expires = new Date(Date.now() + 15 * 60 * 1000);

    const otp = await prismaClient.otp.create({
      data: {
        token: token,
        expiry: otp_expires,
        userId: user.id,
      },
    });
    const { emailBody, emailText } =
      await this.emailService.resetPasswordTemplate(user.username, otp!.token);

    await Sendmail({
      from: `${config.GOOGLE_SENDER_MAIL}`,
      to: email,
      subject: "PASSWORD RESET",
      text: emailText,
      html: emailBody,
    });
    return {
      message: "OTP sent successfully",
    };
  }

  resetPassword = async (
    token: string,
    new_password: string,
    confirm_password: string
  ): Promise<{ message: string }> => {
    if (new_password !== confirm_password) {
      throw new BadRequest("Password doesn't match");
    }
    const otp = await prismaClient.otp.findFirst({
      where: { token },
      include: { user: true },
    });
    if (!otp) {
      throw new ResourceNotFound("Invalid OTP");
    }

    if (otp.expiry < new Date()) {
      // Delete the expired OTP
      await prismaClient.otp.delete({
        where: { id: otp.id },
      });
      throw new Expired("OTP has expired");
    }

    const hashedPassword = await hashPassword(new_password);
    await prismaClient.$transaction([
      prismaClient.user.update({
        where: { id: otp.userId },
        data: { password: hashedPassword },
      }),
      prismaClient.otp.delete({
        where: { id: otp.id },
      }),
    ]);

    return {
      message: "Password reset successfully.",
    };
  };
}
