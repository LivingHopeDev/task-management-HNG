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
  const limit = parseInt((req.query.limit as string) || "10", 10);

  const { message, data } = await taskService.getAllTask(user, page, limit);

  return res.status(200).json({
    message,
    data,
    page,
    limit,
  });
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const taskId = req.params.id;
  console.log("taskid", taskId);
  const { message, data } = await taskService.getTaskById(user, taskId);

  return res.status(200).json({
    message,
    data,
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(400).json({
      success: false,
      status_code: 400,
      message: "Task ID is required.",
    });
  }
  const { message, data } = await taskService.deleteTask(user, taskId);

  return res.status(200).json({ message, data });
});
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(400).json({
      success: false,
      status_code: 400,
      message: "Task ID is required.",
    });
  }
  const response = await taskService.updateTask(user, taskId, req.body);

  return res.status(200).json(response);
});

export const shareTask = asyncHandler(async (req: Request, res: Response) => {
  const { emails, taskId } = req.body;
  const response = await taskService.shareTask(emails, taskId);
  res.status(200).json(response);
});
