import { prismaClient } from "..";
import { ITask, ITaskService } from "../types";
import { Task, User } from "@prisma/client";
import { BadRequest, InvalidInput, ResourceNotFound } from "../middlewares";
import { formatDate } from "../utils/formatDate";
import { Sendmail } from "../utils/sendMail";
import { EmailService } from "./emailService";
import config from "../config";

export class TaskService implements ITaskService {
  private emailService = new EmailService();
  public async createTask(
    payload: ITask,
    userId: string
  ): Promise<{ message: string; data: Partial<Task> }> {
    const { title, description, dueDate, status, priority, tags } = payload;
    const dueDateObj = formatDate(dueDate);

    const task = await prismaClient.task.create({
      data: {
        title,
        description,
        dueDate: dueDateObj,
        status,
        priority,
        createdBy: { connect: { id: userId } },
        tags,
        assignedTo: [],
      },
    });

    return {
      message: "Task created successfully",
      data: task,
    };
  }

  public async getAllTask(user: User, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const tasks = await prismaClient.task.findMany({
      where: {
        OR: [
          { createdBy: { id: user.id } },
          { assignedTo: { has: user.email } },
        ],
      },
      skip,
      take: limit,
    });
    if (tasks.length === 0) {
      return {
        message: "You have no tasks.",
        tasks: [],
      };
    }
    return {
      message: "Tasks retrieved successfully",
      data: tasks,
    };
  }

  public async getTaskById(user: User, taskId: string) {
    const task = await prismaClient.task.findFirst({
      where: {
        id: taskId,
        OR: [
          { createdBy: { id: user.id } },
          { assignedTo: { has: user.email } },
        ],
      },
    });
    if (!task) {
      return {
        message: "Task not found or you do not have access to it.",
        task: null,
      };
    }
    return {
      message: "Tasks retrieved successfully",
      data: task,
    };
  }

  public async deleteTask(user: User, taskId: string) {
    //ONLY THE CREATOR OF A TASK CAN DELETE IT
    const task = await prismaClient.task.findFirst({
      where: {
        id: taskId,
        createdBy: { id: user.id },
      },
    });

    if (!task) {
      throw new BadRequest(
        "Task not found or you do not have access to delete it."
      );
    }

    await prismaClient.task.delete({
      where: { id: taskId },
    });

    return {
      message: "Task deleted successfully.",
      data: [],
    };
  }

  public async updateTask(
    user: User,
    taskId: string,
    payload: ITask
  ): Promise<{ message: string; data: Partial<Task> }> {
    const task = await prismaClient.task.findFirst({
      where: {
        id: taskId,
        OR: [
          { createdBy: { id: user.id } },
          { assignedTo: { has: user.email } },
        ],
      },
    });

    if (!task) {
      throw new BadRequest(
        "Task not found or you do not have access to update it."
      );
    }
    const { title, description, dueDate, status, priority, tags } = payload;
    const dueDateObj = formatDate(dueDate);

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        dueDate: dueDateObj,
        status,
        priority,
        tags,
      },
    });

    return {
      message: "Task updated successfully.",
      data: updatedTask,
    };
  }

  public async shareTask(
    emails: [string],
    taskId: string
  ): Promise<{ message: string; data: Partial<Task> }> {
    const task = await prismaClient.task.findFirst({ where: { id: taskId } });
    if (!task) {
      throw new ResourceNotFound(`Task with ID ${taskId} not found`);
    }

    const sharedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: { assignedTo: { push: emails } },
    });

    emails.forEach(async (email) => {
      const { emailBody, emailText } =
        await this.emailService.shareTaskEmailTemplate(email);

      await Sendmail({
        from: `${config.GOOGLE_SENDER_MAIL}`,
        to: email,
        subject: `Task shared: ${sharedTask.title}`,
        text: emailText,
        html: emailBody,
      });
    });

    return {
      message: "Task share successfully",
      data: sharedTask,
    };
  }
  public async taskSharedWithMe(
    userId: string
  ): Promise<{ message: string; data: Task[] }> {
    const user = await prismaClient.user.findFirst({ where: { id: userId } });
    const tasks = await prismaClient.task.findMany({
      where: {
        assignedTo: { has: user.email },
      },
    });

    return {
      message: "Task retrieved successfully",
      data: tasks,
    };
  }
}
