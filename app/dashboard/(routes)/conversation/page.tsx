// app/conversation/layout.tsx
import { MessageCircleMore } from "lucide-react";
import React from "react";

export default function ConversationPage() {
  return (
    <div>
      <header className="p-4 text-black flex items-center justify-center flex-col">
        <MessageCircleMore size={128} className="text-gray-700" />
        <p className="text-2xl mt-4 text-gray-600">Your messages</p>
      </header>
    </div>
  );
}
