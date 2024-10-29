import { TaskSchema } from "../schema";
import { validateData, authMiddleware } from "../middlewares";
import { createTask } from "../controllers";
import { Router } from "express";
const taskRoute = Router();

taskRoute.post("/", validateData(TaskSchema), authMiddleware, createTask);

export { taskRoute };
