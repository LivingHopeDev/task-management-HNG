import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import asyncHandler from "../middlewares/asyncHandler";

const taskService = new TaskService();
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const { message, task } = await taskService.createTask(req.body, userId);
  res.status(201).json({ message, task });
});
