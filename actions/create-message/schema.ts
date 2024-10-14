// app/api/messages/create/schema.ts
import { z } from "zod";

export const CreateMessage = z.object({
  conversationId: z.string(),
  content: z.string().min(1, "Content is required"),
});
