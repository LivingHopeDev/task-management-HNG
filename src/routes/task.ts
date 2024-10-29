import { TaskSchema } from "../schema";
import { validateData, authMiddleware } from "../middlewares";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers";
import { Router } from "express";
const taskRoute = Router();

taskRoute.post("/", validateData(TaskSchema), authMiddleware, createTask);
taskRoute.get("/", authMiddleware, getAllTask);
taskRoute.get("/:id", authMiddleware, getTaskById);
taskRoute.delete("/:id", authMiddleware, deleteTask);
taskRoute.put("/:id", authMiddleware, updateTask);

export { taskRoute };
