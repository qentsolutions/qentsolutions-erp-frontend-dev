// app/api/conversations/delete/schema.ts
import { z } from "zod";

export const DeleteConversation = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"), // Valide que l'ID de la conversation est fourni
});
