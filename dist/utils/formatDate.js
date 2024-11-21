"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const middlewares_1 = require("../middlewares");
const formatDate = (dueDate) => {
    if (!dueDate || !dueDate.year || !dueDate.month || !dueDate.day) {
        throw new middlewares_1.BadRequest("Invalid due date provided");
    }
    const dueDateObj = new Date(Date.UTC(dueDate.year, dueDate.month - 1, dueDate.day));
    const currentDate = new Date();
    if (!(dueDateObj instanceof Date) || dueDateObj <= currentDate) {
        throw new middlewares_1.BadRequest("Due date must be a valid future date.");
    }
    return dueDateObj;
};
exports.formatDate = formatDate;
