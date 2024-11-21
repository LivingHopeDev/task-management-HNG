"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareTaskSchema = exports.TaskSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    dueDate: zod_1.z.object({}),
    status: zod_1.z.string().optional(),
    priority: zod_1.z.nativeEnum(client_1.priority),
    tags: zod_1.z.array(zod_1.z.string()),
});
exports.shareTaskSchema = zod_1.z.object({
    emails: zod_1.z.array(zod_1.z.string()),
    taskId: zod_1.z.string(),
});
