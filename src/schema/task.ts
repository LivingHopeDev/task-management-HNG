import { priority } from "@prisma/client";
import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.object({}),
  status: z.string().optional(),
  priority: z.nativeEnum(priority),
  tags: z.array(z.string()),
});
