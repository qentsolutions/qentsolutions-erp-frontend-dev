"use server";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { DeleteConversation } from "./schema";
import { getCurrentUser } from "aws-amplify/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const userId = getCurrentUser();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { conversationId } = data;

  if (!conversationId) {
    return {
      error: "Conversation ID is required",
    };
  }

  try {
    // Retirer l'utilisateur de la conversation
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      select: { participants: true },
    });

    if (!conversation) {
      return {
        error: "Conversation not found",
      };
    }

    const updatedParticipants = conversation.participants.filter(
      (participant) => participant !== userId,
    );

    await db.conversation.update({
      where: { id: conversationId },
      data: {
        participants: {
          set: updatedParticipants,
        },
      },
    });

    // Vérifier le nombre de participants restants
    const updatedConversation = await db.conversation.findUnique({
      where: { id: conversationId },
    });

    // Si la conversation est vide, supprimer la conversation et ses messages
    if (updatedConversation && updatedConversation.participants.length === 0) {
      await db.message.deleteMany({
        where: { conversationId: conversationId },
      });

      await db.conversation.delete({
        where: { id: conversationId },
      });
    }

    // Pas de retour de données
    return {};
  } catch (error) {
    console.error("[CONVERSATIONS]", error);
    return {
      error: "Internal Error",
    };
  }
};

export const deleteConversation = createSafeAction(DeleteConversation, handler);
