// app/api/conversations/delete/types.ts
import { z } from "zod";
import { DeleteConversation } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Conversation } from "@prisma/client";

export type InputType = z.infer<typeof DeleteConversation>;
export type ReturnType = ActionState<InputType, Conversation>;
