import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import asyncHandler from "../middlewares/asyncHandler";

const taskService = new TaskService();
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const { message, data } = await taskService.createTask(req.body, userId);
  res.status(201).json({ message, data });
});

export const getAllTask = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const page = parseInt((req.query.page as string) || "1", 10);
  const pageSize = parseInt((req.query.pageSize as string) || "10", 10);

  const { message, data } = await taskService.getAllTask(user);

  return res.status(200).json({
    message,
    data,
    page,
    pageSize,
  });
});
