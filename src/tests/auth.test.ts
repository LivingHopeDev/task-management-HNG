// import { AuthService, OtpService, EmailService } from "../services";

// jest.mock("../services", () => ({
//   AuthService: jest.fn(),
//   OtpService: jest.fn(() => ({
//     createOtp: jest.fn(), // Mocked method
//   })),
//   EmailService: jest.fn(() => ({
//     verifyEmailTemplate: jest.fn(), // Mocked method
//   })),
// }));

// jest.mock("../utils/sendmail", () => ({
//   Sendmail: jest.fn(),
// }));

// describe("registration", () => {
//   it("should call the mocked services", async () => {
//     // Mock return values
//     const mockOtp = { token: "123456" };
//     const mockEmailResponse = {
//       emailBody: "HTML body",
//       emailText: "plain text",
//     };

//     // Access mocked instances
//     const otpServiceMock = OtpService as jest.MockedClass<typeof OtpService>;
//     otpServiceMock.mock.instances[0].createOtp.mockResolvedValue(mockOtp);

//     const emailServiceMock = EmailService as jest.MockedClass<
//       typeof EmailService
//     >;
//     emailServiceMock.mock.instances[0].verifyEmailTemplate.mockResolvedValue(
//       mockEmailResponse
//     );

//     const authServiceMock = AuthService as jest.MockedClass<typeof AuthService>;
//     authServiceMock.mockImplementation(() => ({
//       signUp: jest.fn().mockResolvedValue({
//         message: "User Created Successfully",
//         user: {
//           id: "mock-id",
//           username: "testuser",
//           email: "test@example.com",
//         },
//       }),
//     }));

//     // Call the mocked signUp method
//     const authService = new AuthService();
//     const result = await authService.signUp({
//       email: "test@example.com",
//       username: "testuser",
//       password: "password123",
//     });

//     // Assertions
//     expect(result.user).toEqual({
//       id: "mock-id",
//       username: "testuser",
//       email: "test@example.com",
//     });
//     expect(result.message).toBe("User Created Successfully");
//     expect(otpServiceMock.mock.instances[0].createOtp).toHaveBeenCalled();
//     expect(
//       emailServiceMock.mock.instances[0].verifyEmailTemplate
//     ).toHaveBeenCalledWith("testuser", "123456");
//   });
// });
