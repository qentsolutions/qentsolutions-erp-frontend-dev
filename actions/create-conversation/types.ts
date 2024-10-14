// app/api/conversations/create/types.ts
import { z } from "zod";
import { CreateConversation } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Conversation } from "@prisma/client";

export type InputType = z.infer<typeof CreateConversation>;
export type ReturnType = ActionState<InputType, Conversation>;
