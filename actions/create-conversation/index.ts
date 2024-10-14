// app/api/conversations/create/index.ts
"use server";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateConversation } from "./schema";
import { getCurrentUser } from "aws-amplify/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const userId = getCurrentUser();

  const { participants } = data; // On suppose que participants est une liste de userIds

  // Inclure l'utilisateur courant dans les participants
  const uniqueParticipants = Array.from(
    new Set([userId, ...(participants || [])]),
  );

  if (uniqueParticipants.length === 0) {
    return {
      error: "Participants are required",
    };
  }

  try {
    const conversation = await db.conversation.create({
      data: {
        participants: uniqueParticipants,
      },
    });

    return { data: conversation };
  } catch (error) {
    console.error("[CONVERSATIONS]", error);
    return {
      error: "Internal Error",
    };
  }
};

export const createConversation = createSafeAction(CreateConversation, handler);
