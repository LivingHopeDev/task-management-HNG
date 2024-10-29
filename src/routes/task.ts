import { TaskSchema } from "../schema";
import { validateData, authMiddleware } from "../middlewares";
import { createTask, getAllTask, getTaskById } from "../controllers";
import { Router } from "express";
const taskRoute = Router();

taskRoute.post("/", validateData(TaskSchema), authMiddleware, createTask);
taskRoute.get("/", authMiddleware, getAllTask);
taskRoute.get("/:id", authMiddleware, getTaskById);

export { taskRoute };
