import { IUserSignUp, IAuthService, IUserLogin } from "../types";
import { User } from "@prisma/client";
import { prismaClient } from "..";
import { hashPassword, comparePassword, generateAccessToken } from "../utils";
import { BadRequest, Conflict, ResourceNotFound } from "../middlewares/error";
import { OtpService, EmailService } from ".";
import { Sendmail } from "../utils/sendMail";
import config from "../config";
export class AuthService implements IAuthService {
  private otpService = new OtpService();
  private emailService = new EmailService();
  public async signUp(payload: IUserSignUp): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
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
    const access_token = await generateAccessToken(newUser.id);

    // THESE LINES OF CODE WERE COMMENTED OUT BECAUSE I COULDN'T GET A FREE EMAIL PROVIDER...

    // const otp = await this.otpService.createOtp(newUser.id);
    // const { emailBody, emailText } = await this.emailService.otpEmailTemplate(
    //   first_name,
    //   otp!.token
    // );

    // await Sendmail({
    //   from: `hopedigital2021@outlook.com`,
    //   to: email,
    //   subject: "OTP VERIFICATION",
    //   text: emailText,
    //   html: emailBody,
    // });
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    return {
      user: userResponse,
      access_token,
      message: "User Created Successfully.",
    };
    // "User Created Successfully. Kindly check your mail for your verification token",
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
}
