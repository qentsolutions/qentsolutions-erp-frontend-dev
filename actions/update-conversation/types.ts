// app/api/conversations/update/types.ts
import { z } from "zod";
import { UpdateConversation } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Conversation } from "@prisma/client";

export type InputType = z.infer<typeof UpdateConversation>;
export type ReturnType = ActionState<InputType, Conversation>;
