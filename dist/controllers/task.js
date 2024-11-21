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
exports.shareTaskwithMe = exports.shareTask = exports.updateTask = exports.deleteTask = exports.getTaskById = exports.getAllTask = exports.createTask = void 0;
const taskService_1 = require("../services/taskService");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const taskService = new taskService_1.TaskService();
exports.createTask = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { message, data } = yield taskService.createTask(req.body, userId);
    res.status(201).json({ message, data });
}));
exports.getAllTask = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const filters = {
        status: req.query.status,
        priority: req.query.priority,
        tags: req.query.tags ? req.query.tags.split(",") : undefined,
    };
    const { message, data } = yield taskService.getAllTask(user, page, limit, filters);
    return res.status(200).json({
        message,
        data,
        page,
        limit,
    });
}));
exports.getTaskById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const taskId = req.params.id;
    console.log("taskid", taskId);
    const { message, data } = yield taskService.getTaskById(user, taskId);
    return res.status(200).json({
        message,
        data,
    });
}));
exports.deleteTask = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({
            success: false,
            status_code: 400,
            message: "Task ID is required.",
        });
    }
    const { message, data } = yield taskService.deleteTask(user, taskId);
    return res.status(200).json({ message, data });
}));
exports.updateTask = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({
            success: false,
            status_code: 400,
            message: "Task ID is required.",
        });
    }
    const response = yield taskService.updateTask(user, taskId, req.body);
    return res.status(200).json(response);
}));
exports.shareTask = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emails, taskId } = req.body;
    const response = yield taskService.shareTask(emails, taskId);
    res.status(200).json(response);
}));
exports.shareTaskwithMe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const response = yield taskService.taskSharedWithMe(userId);
    res.status(200).json(response);
}));
