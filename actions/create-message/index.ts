// app/api/messages/create/index.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateMessage } from "./schema";
import { getCurrentUser } from "aws-amplify/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const userId = getCurrentUser();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { conversationId, content } = data;

  if (!conversationId || !content) {
    return {
      error: "Conversation ID and content are required",
    };
  }

  try {
    const message = await db.message.create({
      data: {
        conversationId,
        userId,
        content,
      },
    });

    // Optionnel : revalidation si nécessaire
    revalidatePath(`/conversation/${conversationId}`);

    return { data: message };
  } catch (error) {
    console.error("[MESSAGES]", error);
    return {
      error: "Internal Error",
    };
  }
};

export const createMessage = createSafeAction(CreateMessage, handler);
