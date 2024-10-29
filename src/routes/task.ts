import { TaskSchema } from "../schema";
import { validateData, authMiddleware } from "../middlewares";
import { createTask, getAllTask } from "../controllers";
import { Router } from "express";
const taskRoute = Router();

taskRoute.post("/", validateData(TaskSchema), authMiddleware, createTask);
taskRoute.get("/", authMiddleware, getAllTask);

export { taskRoute };
