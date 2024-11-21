import { TaskSchema, shareTaskSchema } from "../schema";
import { validateData, authMiddleware } from "../middlewares";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  shareTask,
  shareTaskwithMe,
  updateTask,
} from "../controllers";
import { Router } from "express";
const taskRoute = Router();

taskRoute.post("/", validateData(TaskSchema), authMiddleware, createTask);
taskRoute.get("/", authMiddleware, getAllTask);
taskRoute.get("/:id", authMiddleware, getTaskById);
taskRoute.delete("/:id", authMiddleware, deleteTask);
taskRoute.put("/:id", validateData(TaskSchema), authMiddleware, updateTask);
taskRoute.post(
  "/share",
  validateData(shareTaskSchema),
  authMiddleware,
  shareTask
);
taskRoute.get("/share/me", authMiddleware, shareTaskwithMe);
export { taskRoute };
