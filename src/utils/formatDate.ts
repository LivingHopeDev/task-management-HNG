import { BadRequest } from "../middlewares";
export const formatDate = (dueDate) => {
  if (!dueDate || !dueDate.year || !dueDate.month || !dueDate.day) {
    throw new BadRequest("Invalid due date provided");
  }
  const dueDateObj = new Date(
    Date.UTC(dueDate.year, dueDate.month - 1, dueDate.day)
  );

  const currentDate = new Date();
  if (!(dueDateObj instanceof Date) || dueDateObj <= currentDate) {
    throw new BadRequest("Due date must be a valid future date.");
  }
  return dueDateObj;
};
