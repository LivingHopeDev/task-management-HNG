export const createTask = `
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

export const getAllTask = `
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
 *       401:
 *         description: Unauthorized - User needs to be logged in
 *       500:
 *         description: Internal server error
 */
`;
export const getTaskById = `
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

export const deleteTask = `/**
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

export const updateTask = `
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
