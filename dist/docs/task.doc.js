"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedTaskWithMe = exports.updateTask = exports.deleteTask = exports.getTaskById = exports.getAllTask = exports.createTask = void 0;
exports.createTask = `
/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete the project"
 *               description:
 *                 type: string
 *                 example: "Finish all pending tasks and submit the project by the end of the week"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *               status:
 *                 type: string
 *                 example: "in_progress"
 *               priority:
 *                 type: string
 *                 example: "high"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["work", "urgent"]
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1234abcd"
 *                     title:
 *                       type: string
 *                       example: "Complete the project"
 *                     description:
 *                       type: string
 *                       example: "Finish all pending tasks and submit the project by the end of the week"
 *                     dueDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-31"
 *                     status:
 *                       type: string
 *                       example: "in_progress"
 *                     priority:
 *                       type: string
 *                       example: "high"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["work", "urgent"]
 *                     createdBy:
 *                       type: string
 *                       example: "user123"
 *                     assignedTo:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized - User needs to be logged in
 *       500:
 *         description: Internal server error
 */
`;
exports.getAllTask = `
/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *         description: Filter tasks by their status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter tasks by their priority
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Filter tasks by tags (comma-separated values, e.g., "work,urgent")
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tasks retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1234abcd"
 *                       title:
 *                         type: string
 *                         example: "Complete the project"
 *                       description:
 *                         type: string
 *                         example: "Finish all pending tasks and submit the project by the end of the week"
 *                       dueDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-12-31"
 *                       status:
 *                         type: string
 *                         example: "in_progress"
 *                       priority:
 *                         type: string
 *                         example: "high"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["work", "urgent"]
 *                       createdBy:
 *                         type: string
 *                         example: "user123"
 *                       assignedTo:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["user@example.com"]
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Bad Request - Invalid filter values provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid status value. Accepted values are: 'pending', 'in_progress', 'completed'."
 *       401:
 *         description: Unauthorized - User needs to be logged in
 *       500:
 *         description: Internal server error
 */
`;
exports.getTaskById = `
/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the task
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1234abcd"
 *                     title:
 *                       type: string
 *                       example: "Complete the project"
 *                     description:
 *                       type: string
 *                       example: "Finish all pending tasks and submit the project by the end of the week"
 *                     dueDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-31"
 *                     status:
 *                       type: string
 *                       example: "in_progress"
 *                     priority:
 *                       type: string
 *                       example: "high"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["work", "urgent"]
 *                     createdBy:
 *                       type: string
 *                       example: "user123"
 *                     assignedTo:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["user@example.com"]
 *       404:
 *         description: Task not found or user does not have access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found or you do not have access to it."
 *       401:
 *         description: Unauthorized - User needs to be logged in
 *       500:
 *         description: Internal server error
 */
`;
exports.deleteTask = `/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID (only creator can delete)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       400:
 *         description: Task ID is required or task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 status_code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Task ID is required."
 *       401:
 *         description: Unauthorized - User needs to be logged in
 *       403:
 *         description: Forbidden - User does not have permission to delete this task
 *       500:
 *         description: Internal server error
 */
`;
exports.updateTask = `
/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID (accessible to creator or assigned users)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Task Title"
 *               description:
 *                 type: string
 *                 example: "Updated task description"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *               status:
 *                 type: string
 *                 example: "completed"
 *               priority:
 *                 type: string
 *                 example: "high"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["updated", "urgent"]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1234abcd"
 *                     title:
 *                       type: string
 *                       example: "Updated Task Title"
 *                     description:
 *                       type: string
 *                       example: "Updated task description"
 *                     dueDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-31"
 *                     status:
 *                       type: string
 *                       example: "completed"
 *                     priority:
 *                       type: string
 *                       example: "high"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["updated", "urgent"]
 *       400:
 *         description: Task ID is required or invalid input
 *       401:
 *         description: Unauthorized - User needs to be logged in
 *       403:
 *         description: Forbidden - User does not have permission to update this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
`;
exports.sharedTaskWithMe = `
/**
 * @swagger
 * /api/v1/tasks/share/me:
 *   get:
 *     summary: Retrieve tasks shared with the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks shared with the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Task retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad Request - Invalid request or missing user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid request
 *       401:
 *         description: Unauthorized - Access token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Not Found - User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Server error
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the task
 *         title:
 *           type: string
 *           description: Title of the task
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *         assignedTo:
 *           type: array
 *           items:
 *             type: string
 *           description: List of users the task is assigned to
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date for the task
 *         status:
 *           type: string
 *           description: Current status of the task (e.g., "Pending", "Completed")
 */
`;
