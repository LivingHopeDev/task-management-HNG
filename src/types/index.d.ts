import { User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export enum StatusEnum {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum PriorityEnum {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface IUserSignUp {
  username: string;
  email: string;
  password: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}
export interface ITask {
  title: string;
  description: string;
  status: StatusEnum;
  priority: PriorityEnum;
  dueDate: {
    year: number;
    month: number;
    day: number;
  };
  assignedTo?: Array<string>;
  tags: Array<string>;
}
export interface IVariation {
  productId: string;
  type: string;
  value: string;
}

export interface IAuthService {
  login(payload: IUserLogin): Promise<unknown>;
  signUp(payload: IUserSignUp, res: unknown): Promise<unknown>;
  // verifyEmail(token: string, email: string): Promise<unknown>;
  // changePassword(
  //   userId: string,
  //   oldPassword: string,
  //   newPassword: string,
  //   confirmPassword: string,
  // ): Promise<{ message: string }>;

  // passwordlessLogin(userId: string): Promise<{ access_token: string }>;
}

export interface ITaskService {
  createTask(payload: ITask, userId): Promise<unknown>;
}
