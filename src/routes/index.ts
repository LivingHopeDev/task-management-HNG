import { Router } from "express";
import { authRoute } from "./auth";

const rootRouter: Router = Router();
rootRouter.use("/users", authRoute);

export default rootRouter;
