import { Router } from "express";
import { authRoute } from "./auth";
import { taskRoute } from "./task";

const rootRouter: Router = Router();
rootRouter.use("/users", authRoute);
rootRouter.use("/tasks", taskRoute);

export default rootRouter;
