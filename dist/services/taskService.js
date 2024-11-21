"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const __1 = require("..");
const middlewares_1 = require("../middlewares");
const formatDate_1 = require("../utils/formatDate");
const sendMail_1 = require("../utils/sendMail");
const emailService_1 = require("./emailService");
const config_1 = __importDefault(require("../config"));
class TaskService {
    constructor() {
        this.emailService = new emailService_1.EmailService();
    }
    createTask(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, dueDate, status, priority, tags } = payload;
            const dueDateObj = (0, formatDate_1.formatDate)(dueDate);
            const task = yield __1.prismaClient.task.create({
                data: {
                    title,
                    description,
                    dueDate: dueDateObj,
                    status,
                    priority,
                    createdBy: { connect: { id: userId } },
                    tags,
                    assignedTo: [],
                },
            });
            return {
                message: "Task created successfully",
                data: task,
            };
        });
    }
    getAllTask(user, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const tasks = yield __1.prismaClient.task.findMany({
                where: {
                    OR: [
                        { createdBy: { id: user.id } },
                        { assignedTo: { has: user.email } },
                    ],
                },
                skip,
                take: limit,
            });
            if (tasks.length === 0) {
                return {
                    message: "You have no tasks.",
                    tasks: [],
                };
            }
            return {
                message: "Tasks retrieved successfully",
                data: tasks,
            };
        });
    }
    getTaskById(user, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield __1.prismaClient.task.findFirst({
                where: {
                    id: taskId,
                    OR: [
                        { createdBy: { id: user.id } },
                        { assignedTo: { has: user.email } },
                    ],
                },
            });
            if (!task) {
                return {
                    message: "Task not found or you do not have access to it.",
                    task: null,
                };
            }
            return {
                message: "Tasks retrieved successfully",
                data: task,
            };
        });
    }
    deleteTask(user, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            //ONLY THE CREATOR OF A TASK CAN DELETE IT
            const task = yield __1.prismaClient.task.findFirst({
                where: {
                    id: taskId,
                    createdBy: { id: user.id },
                },
            });
            if (!task) {
                throw new middlewares_1.BadRequest("Task not found or you do not have access to delete it.");
            }
            yield __1.prismaClient.task.delete({
                where: { id: taskId },
            });
            return {
                message: "Task deleted successfully.",
                data: [],
            };
        });
    }
    updateTask(user, taskId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield __1.prismaClient.task.findFirst({
                where: {
                    id: taskId,
                    OR: [
                        { createdBy: { id: user.id } },
                        { assignedTo: { has: user.email } },
                    ],
                },
            });
            if (!task) {
                throw new middlewares_1.BadRequest("Task not found or you do not have access to update it.");
            }
            const { title, description, dueDate, status, priority, tags } = payload;
            const dueDateObj = (0, formatDate_1.formatDate)(dueDate);
            const updatedTask = yield __1.prismaClient.task.update({
                where: { id: taskId },
                data: {
                    title,
                    description,
                    dueDate: dueDateObj,
                    status,
                    priority,
                    tags,
                },
            });
            return {
                message: "Task updated successfully.",
                data: updatedTask,
            };
        });
    }
    shareTask(emails, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield __1.prismaClient.task.findFirst({ where: { id: taskId } });
            if (!task) {
                throw new middlewares_1.ResourceNotFound(`Task with ID ${taskId} not found`);
            }
            const sharedTask = yield __1.prismaClient.task.update({
                where: { id: taskId },
                data: { assignedTo: { push: emails } },
            });
            emails.forEach((email) => __awaiter(this, void 0, void 0, function* () {
                const { emailBody, emailText } = yield this.emailService.shareTaskEmailTemplate(email);
                yield (0, sendMail_1.Sendmail)({
                    from: `${config_1.default.GOOGLE_SENDER_MAIL}`,
                    to: email,
                    subject: `Task shared: ${sharedTask.title}`,
                    text: emailText,
                    html: emailBody,
                });
            }));
            return {
                message: "Task share successfully",
                data: sharedTask,
            };
        });
    }
    taskSharedWithMe(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield __1.prismaClient.user.findFirst({ where: { id: userId } });
            const tasks = yield __1.prismaClient.task.findMany({
                where: {
                    assignedTo: { has: user.email },
                },
            });
            return {
                message: "Task retrieved successfully",
                data: tasks,
            };
        });
    }
}
exports.TaskService = TaskService;
