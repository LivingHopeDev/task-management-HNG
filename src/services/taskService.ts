import { prismaClient } from "..";
import { ITask, ITaskService } from "../types";
import { Task, User } from "@prisma/client";
import { BadRequest } from "../middlewares";

export class TaskService implements ITaskService {
  public async createTask(
    payload: ITask,
    userId: string
  ): Promise<{ message: string; data: Partial<Task> }> {
    const { title, description, dueDate, status, priority, tags } = payload;
    if (!dueDate || !dueDate.year || !dueDate.month || !dueDate.day) {
      throw new BadRequest("Invalid due date provided");
    }
    const dueDateObj = new Date(dueDate.year, dueDate.month - 1, dueDate.day);

    const currentDate = new Date();
    if (!(dueDateObj instanceof Date) || dueDateObj <= currentDate) {
      throw new BadRequest("Due date must be a valid future date.");
    }

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

  public async getAllTask(user: User) {
    console.log(user);
    const tasks = await prismaClient.task.findMany({
      where: {
        OR: [
          { createdBy: { id: user.id } },
          { assignedTo: { has: user.email } },
        ],
      },
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
    };
  }
}
