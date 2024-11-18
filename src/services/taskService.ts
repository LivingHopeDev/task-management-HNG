import { prismaClient } from "..";
import { ITask, ITaskService } from "../types";
import { Task, User } from "@prisma/client";
import { BadRequest, InvalidInput, ResourceNotFound } from "../middlewares";
import { formatDate } from "../utils/formatDate";

export class TaskService implements ITaskService {
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
    console.log(emails);
    const task = await prismaClient.task.findFirst({ where: { id: taskId } });
    if (!task) {
      throw new ResourceNotFound(`Task with ID ${taskId} not found`);
    }

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: { assignedTo: { push: emails } },
    });

    return {
      message: "Task share successfully",
      data: updatedTask,
    };
  }
}
