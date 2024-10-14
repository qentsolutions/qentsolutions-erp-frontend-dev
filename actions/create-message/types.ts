// app/api/messages/create/types.ts
import { z } from "zod";
import { CreateMessage } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Message } from "@prisma/client";

export type InputType = z.infer<typeof CreateMessage>;
export type ReturnType = ActionState<InputType, Message>;
