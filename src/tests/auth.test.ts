import { AuthService, OtpService, EmailService } from "../services";
import {
  hashPassword,
  generateAccessToken,
  generateNumericOTP,
  comparePassword,
} from "../utils";
import { Sendmail } from "../utils/sendMail";
import { prismaClient } from "..";
import {
  BadRequest,
  Conflict,
  ResourceNotFound,
  Unauthorised,
} from "../middlewares";

jest.mock("../services/OtpService");
jest.mock("../services/EmailService");
jest.mock("../utils");
jest.mock("../utils/sendMail");
jest.mock("..", () => ({
  prismaClient: {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

let authService: AuthService;

beforeEach(() => {
  authService = new AuthService(); // Use the real class
  jest.resetAllMocks();
});
describe("AuthService - signup", () => {
  it("should create a user and send a verification email on successful signup", async () => {
    const mockPayload = {
      email: "user@mail.com",
      username: "adetayo",
      password: "1234",
    };
    const mockHashedPassword = "hashedpassword";

    // Mock dependencies
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(null);
    (hashPassword as jest.Mock).mockResolvedValueOnce(mockHashedPassword);

    const mockUser = {
      id: 1,
      username: mockPayload.username,
      email: mockPayload.email,
    };
    (prismaClient.user.create as jest.Mock).mockResolvedValueOnce(mockUser);

    const mockOtp = { token: "123456" };
    (OtpService.prototype.createOtp as jest.Mock).mockResolvedValueOnce(
      mockOtp
    );
    (
      EmailService.prototype.verifyEmailTemplate as jest.Mock
    ).mockResolvedValueOnce({
      emailBody: "email body content",
      emailText: "email text content",
    });
    (Sendmail as jest.Mock).mockResolvedValueOnce(undefined); // Email sent successfully

    // Call the method
    const result = await authService.signUp(mockPayload);

    // Assertions
    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: { email: mockPayload.email },
    });
    expect(prismaClient.user.create).toHaveBeenCalledWith({
      data: {
        username: mockPayload.username,
        email: mockPayload.email,
        password: mockHashedPassword,
      },
    });
    expect(OtpService.prototype.createOtp).toHaveBeenCalledWith(mockUser.id);
    expect(Sendmail).toHaveBeenCalledWith({
      from: expect.any(String),
      to: mockPayload.email,
      subject: "Email VERIFICATION",
      text: "email text content",
      html: "email body content",
    });

    expect(result).toEqual({
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      },
      message:
        "User Created Successfully. Kindly check your mail for your verification token.",
    });
  });

  it("should throw an error if user already exist ", async () => {
    const mockPayload = {
      email: "user@mail.com",
      username: "adetayo",
      password: "1234",
    };

    const existingUser = {
      id: 1,
      username: "adetayo",
      email: "user@mail.com",
      password: "hashedpassword",
    };

    (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(existingUser);
    await expect(authService.signUp(mockPayload)).rejects.toThrow(
      new Conflict("User already exists")
    );
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockPayload.email },
    });
  });
});

describe("Authservice - login", () => {
  const mockpayload = {
    email: "user@mail.com",
    password: "1234",
  };
  it("should log user in when the email, password is correct and the user is verified", async () => {
    const existingUser = {
      id: 2,
      username: "adetayo",
      email: "user@mail.com",
      password: "hashedpassword",
      is_verified: true,
    };

    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(
      existingUser
    );
    (comparePassword as jest.Mock).mockResolvedValueOnce(true);
    await authService.login(mockpayload);
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockpayload.email },
    });
  });
  it("should throw error if user doesn't exist", async () => {
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(null);

    await expect(authService.login(mockpayload)).rejects.toThrow(
      new ResourceNotFound("User not found")
    );
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockpayload.email },
    });
  });
  it("should throw error if user exists but email is not verified", async () => {
    const existingUser = {
      id: 1,
      username: "adetayo",
      email: "user@mail.com",
      password: "hashedpassword",
      is_verified: false, // Simulate the case where the user is not verified
    };
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(
      existingUser
    );
    expect(authService.login(mockpayload)).rejects.toThrow(
      new Unauthorised(
        "Email verification required. Please verify your email to proceed."
      )
    );
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockpayload.email },
    });
  });
  it("should throw error when user exist but the password is wrong", async () => {
    const existingUser = {
      id: 1,
      username: "adetayo",
      email: "user@mail.com",
      is_verified: true,
    };
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(
      existingUser
    );
    (comparePassword as jest.Mock).mockResolvedValueOnce(false);
    await expect(authService.login(mockpayload)).rejects.toThrow(
      new BadRequest("Authentication failed")
    );
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: {
        email: mockpayload.email,
      },
    });
  });
});
