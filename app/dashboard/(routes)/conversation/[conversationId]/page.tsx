"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import io from "socket.io-client";
import { useAction } from "@/hooks/use-action";
import { createMessage } from "@/actions/create-message";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Info, Plus } from "lucide-react";
import { deleteConversation } from "@/actions/delete-conversation";
import { updateConversation } from "@/actions/update-conversation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identifier: string;
  photo: string;
}

interface Message {
  createdAt: string | number | Date;
  id: string;
  userId: string;
  content: string;
}

interface Conversation {
  participants: any;
  id: string;
  name: string;
}

let socket: any;

const ConversationPage = () => {
  const { conversationId } = useParams() as { conversationId: string };
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAddingParticipant, setIsAddingParticipant] = useState(false); // État pour gérer l'affichage de la liste des utilisateurs
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userRes, usersRes, convsRes, convRes] = await Promise.all([
          fetch("/api/user"),
          fetch("/api/users"),
          fetch("/api/conversations"),
          fetch(`/api/conversation?id=${conversationId}`),
        ]);

        const userData = await userRes.json();
        const usersData = await usersRes.json();
        const convsData = await convsRes.json();
        const convData = await convRes.json();

        if (userRes.ok) setUserId(userData.userId);
        if (usersRes.ok) setUsers(usersData);
        if (convsRes.ok) setConversations(convsData);
        if (convRes.ok) setConversation(convData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchData();

    const markAsSeen = async () => {
      await fetch(`/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId, userId }),
      });
    };

    markAsSeen();

    const initSocket = async () => {
      if (!socket) {
        socket = io("http://localhost:3000")

        socket.on("connect", () => {
          socket.emit("join_conversation", conversationId);
        });

        socket.on("receive_message", (message: Message) => {
          setMessages((prev) => {
            if (!prev.some((m) => m.id === message.id)) {
              return [...prev, message];
            }
            return prev;
          });
        });

        socket.on("existing_messages", (existingMessages: Message[]) => {
          setMessages((prev) => {
            const newMessages = existingMessages.filter(
              (msg) => !prev.some((m) => m.id === msg.id),
            );
            return [...prev, ...newMessages];
          });
        });
      }
    };

    initSocket();
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { execute } = useAction(createMessage, {
    onSuccess: (data) => {
      setNewMessage("");
      const message = {
        ...data,
        conversationId,
      };
      socket.emit("send_message", message);
    },
    onError: (error) => {
      toast.error("Error sending message");
    },
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const message = { content: newMessage, conversationId };
    await execute(message);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleJoinConversation = (convId: string) => {
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(
      /conversation\/[^/]+/,
      `conversation/${convId}`,
    );
    router.push(newUrl);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="w-1/4 p-4 border-r">
          <Skeleton className="h-10 mb-4" />
          <Skeleton className="h-10 mb-4" />
          <Skeleton className="h-10 mb-4" />
        </div>
        <div className="flex flex-col w-3/4 bg-gray-100 p-4">
          <Skeleton className="h-12 mb-4" />
          <Skeleton className="flex-1" />
        </div>
      </div>
    );
  }

  const handleAddParticipant = async (userId: string) => {
    if (!conversation || !conversation.id) return;

    const updatedParticipants = [...conversation.participants, userId];

    const response = await updateConversation({
      conversationId: conversation.id,
      participants: updatedParticipants,
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      setConversation((prev) => {
        if (prev) {
          return {
            ...prev,
            participants: updatedParticipants,
          };
        }
        return prev;
      });

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === conversation.id
            ? { ...conv, participants: updatedParticipants }
            : conv,
        ),
      );

      toast.success("Participant ajouté avec succès !");
    }

    setIsAddingParticipant(false);
  };

  const handleLeaveConversation = async () => {
    if (!conversationId) return;

    const response = await deleteConversation({ conversationId });

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Vous avez quitté la conversation.");
      const currentUrl = window.location.href;
      const newUrl = currentUrl.replace(/conversation\/[^/]+/, `conversation`);
      router.push(newUrl);
    }
  };

  const participantIds = conversation ? conversation.participants : [];
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-full bg-gray-100 ">
        <div className="flex justify-between mb-2 border-b-2 pb-2">
          <div className="flex">
            {users
              .filter((user) => participantIds.includes(user.id))
              .map((user) => {
                const userName =
                  (user.firstName && user.firstName !== "Unknown"
                    ? user.firstName
                    : "") +
                  (user.lastName && user.lastName !== "Unknown"
                    ? ` ${user.lastName}`
                    : "") || user.identifier;

                return (
                  <div key={user.id} className="relative mr-2 group">
                    <img
                      src={user.photo}
                      alt={userName}
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 bg-black text-white text-sm rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {userName}
                    </div>
                  </div>
                );
              })}
          </div>
          <button onClick={toggleOptions} className=" p-2 rounded">
            <Info />
          </button>
        </div>

        <div className="flex flex-1">
          <div
            className={`overflow-y-auto ${isOptionsOpen ? "w-3/4" : "w-full"} transition-all duration-300`}
          >
            <div className="h-full max-h-[calc(100vh-200px)]">
              {messages.map((msg, index) => {
                const user = users.find((u) => u.id === msg.userId);
                let userName = user ? user.identifier : "Utilisateur inconnu";
                if (user) {
                  if (
                    user.firstName === "Unknown" ||
                    user.lastName === "Unknown"
                  ) {
                    userName = user.identifier;
                  } else {
                    userName = `${user.firstName} ${user.lastName}`;
                  }
                }

                const showUserName =
                  index === 0 || messages[index - 1].userId !== msg.userId;
                const isLastMessageFromUser =
                  index === messages.length - 1 ||
                  messages[index + 1].userId !== msg.userId;

                const messageTime = new Date(msg.createdAt).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" },
                );

                return (
                  <div
                    key={msg.id}
                    className={`mb-2 flex items-end ${msg.userId === userId ? "justify-end" : "justify-start"}`}
                  >
                    {isLastMessageFromUser && msg.userId !== userId && user && (
                      <div className="relative mr-2 group z-50">
                        <img
                          src={user.photo}
                          alt={user.identifier}
                          className="w-10 h-10 rounded-full border-2 border-gray-300"
                        />
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 bg-black text-white text-sm rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
                          {user.firstName && user.firstName !== "Unknown"
                            ? user.firstName
                            : user.identifier}
                          {user.lastName && user.lastName !== "Unknown"
                            ? ` ${user.lastName}`
                            : ""}
                        </div>
                      </div>
                    )}
                    <div
                      className={`py-2 px-4 rounded ${msg.userId === userId ? "bg-blue-400 text-white" : "bg-white border"} max-w-xs ${isLastMessageFromUser ? "" : "ml-12"} break-words`}
                    >
                      {showUserName && msg.userId !== userId && (
                        <span className="block text-sm font-semibold">
                          {userName}
                        </span>
                      )}
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                      <span
                        className={`block text-xs text-right mt-1 ${msg.userId === userId ? "text-gray-200" : "text-gray-500"}`}
                      >
                        {messageTime}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          {isOptionsOpen && (
            <div className="bg-white border-l px-12 py-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold">Participants</h2>
                  <button
                    onClick={() => setIsAddingParticipant(!isAddingParticipant)}
                    className="text-blue-500 p-1 rounded"
                  >
                    <Plus />
                  </button>
                </div>
                <ul>
                  {users
                    .filter((user) =>
                      conversation?.participants.includes(user.id),
                    )
                    .map((user) => {
                      const userName =
                        user.firstName !== "Unknown" &&
                          user.lastName !== "Unknown"
                          ? `${user.firstName} ${user.lastName}`
                          : user.identifier;

                      return (
                        <li key={user.id} className="flex items-center mb-2">
                          <img
                            src={user.photo}
                            alt={user.identifier}
                            className="w-8 h-8 rounded-full border-2 border-gray-300"
                          />
                          <span className="ml-2">{userName}</span>
                        </li>
                      );
                    })}
                </ul>
                {isAddingParticipant && (
                  <div className="mt-2">
                    <h3 className="font-bold mb-4">Add a participant</h3>
                    {users.filter(
                      (user) => !conversation?.participants.includes(user.id),
                    ).length === 0 ? (
                      <p>No participants to add.</p>
                    ) : (
                      <ul>
                        {users
                          .filter(
                            (user) =>
                              !conversation?.participants.includes(user.id),
                          ) // Filtrer les utilisateurs déjà participants
                          .map((user) => {
                            const userName =
                              user.firstName !== "Unknown" &&
                                user.lastName !== "Unknown"
                                ? `${user.firstName} ${user.lastName}`
                                : user.identifier;

                            return (
                              <li
                                key={user.id}
                                className="flex items-center mb-2"
                              >
                                <img
                                  src={user.photo}
                                  alt={user.identifier}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                                />
                                <span className="ml-2">{userName}</span>
                                <button
                                  onClick={() => handleAddParticipant(user.id)}
                                  className="ml-2 text-blue-500"
                                >
                                  Add
                                </button>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-red-400 px-4 py-2 rounded">
                      Leave the conversation
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <div className="flex flex-col items-center bg-white">
                      <h3 className="font-semibold mb-4">
                        Are you sure you want to leave the conversation?
                      </h3>
                      <div className="flex w-full justify-center mt-4">
                        <DialogClose asChild>
                          <button className="text-gray-500 px-4 py-2 rounded">
                            Cancel
                          </button>
                        </DialogClose>
                        <button
                          onClick={handleLeaveConversation}
                          className="text-red-400 px-4 py-2 rounded"
                        >
                          Leave
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border-1 border-gray-200 shadow-sm rounded-full pl-6 pr-10"
            placeholder="Type your message here..."
          />
          {newMessage.trim() && (
            <button
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 rounded"
            >
              Envoyer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
