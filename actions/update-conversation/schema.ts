// app/api/conversations/update/schema.ts
import { z } from "zod";

export const UpdateConversation = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"),
  participants: z
    .array(z.string())
    .min(1, "At least one participant is required"),
});
