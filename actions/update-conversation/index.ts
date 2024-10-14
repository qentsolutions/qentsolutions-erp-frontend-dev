// app/api/conversations/update/index.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateConversation } from "./schema";
import { getCurrentUser } from "aws-amplify/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const userId = getCurrentUser();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { conversationId, participants } = data;

  if (!conversationId || !participants) {
    return {
      error: "Conversation ID and participants are required",
    };
  }

  try {
    const updatedConversation = await db.conversation.update({
      where: { id: conversationId },
      data: { participants },
    });

    // Optionnel : revalidation si nécessaire
    // revalidatePath(`/conversation/${conversationId}`);

    return { data: updatedConversation };
  } catch (error) {
    console.error("[UPDATE_CONVERSATION]", error);
    return {
      error: "Internal Error",
    };
  }
};

export const updateConversation = createSafeAction(UpdateConversation, handler);
