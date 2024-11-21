"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const task_1 = require("./task");
const rootRouter = (0, express_1.Router)();
rootRouter.use("/users", auth_1.authRoute);
rootRouter.use("/tasks", task_1.taskRoute);
exports.default = rootRouter;
