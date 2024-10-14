// app/api/conversations/create/schema.ts
import { z } from "zod";

export const CreateConversation = z.object({
  participants: z
    .array(z.string())
    .min(1, "At least one participant is required"), // Valide que la liste de participants n'est pas vide
});
