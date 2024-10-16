"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createConversation } from "@/actions/create-conversation";
import toast from "react-hot-toast";
import { Pencil, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Interfaces pour le typage
interface User {
  id: string;
  firstName: string;
  lastName: string;
  identifier: string;
  photo: string;
}

interface LastMessage {
  content: string;
  createdAt: string;
  userId: string;
  seenBy: string[];
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: LastMessage;
}

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [formattedTimes, setFormattedTimes] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch("/api/conversations");
      const data = await res.json();
      setConversations(data);
    };

    const fetchUsers = async () => {
      const res = await fetch(`/api/users`);
      const data = await res.json();
      setUsers(data);
    };

    const fetchCurrentUser = async () => {
      const res = await fetch(`/api/user`);
      const data = await res.json();
      setCurrentUserId(data.userId);
    };

    fetchConversations();
    fetchUsers();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    // Initialiser les temps formatés dès le chargement
    const initialTimes: Record<string, string> = {};
    conversations.forEach((conv) => {
      if (conv.lastMessage && conv.lastMessage.createdAt) {
        initialTimes[conv.id] = formatTimeAgo(conv.lastMessage.createdAt);
      }
    });
    setFormattedTimes(initialTimes);

    // Mettre à jour les temps formatés toutes les minutes
    const intervalId = setInterval(() => {
      setFormattedTimes((prev) => {
        const newTimes = { ...prev };
        conversations.forEach((conv) => {
          if (conv.lastMessage && conv.lastMessage.createdAt) {
            newTimes[conv.id] = formatTimeAgo(conv.lastMessage.createdAt);
          }
        });
        return newTimes;
      });
    }, 60000);

    return () => clearInterval(intervalId);
  }, [conversations]);

  const { execute } = useAction(createConversation, {
    onSuccess: (data) => {
      toast.success("Conversation created successfully");
      setConversations((prev) => [
        { ...data, lastMessage: {} as LastMessage, orgId: "" },
        ...prev,
      ]);
      setSelectedUserIds([]);
      setIsDialogOpen(false);
      handleJoinConversation(data.id);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleJoinConversation = async (conversationId: string) => {
    if (activeConversationId !== conversationId) {
      setActiveConversationId(conversationId);
      const res = await fetch(`/api/conversation?id=${conversationId}`);
      const data = await res.json();

      if (res.ok) {
        setConversations((prevConversations) =>
          prevConversations.map((conv) => {
            if (conv.id === conversationId) {
              const updatedLastMessage = {
                ...conv.lastMessage,
                seenBy: Array.from(
                  new Set([
                    ...(conv.lastMessage.seenBy || []),
                    currentUserId || "",
                  ]),
                ),
              };
              return { ...conv, lastMessage: updatedLastMessage };
            }
            return conv;
          }),
        );

        const orgId = data.orgId;
        router.push(`/organization/${orgId}/conversation/${conversationId}`);
      } else {
        toast.error("Error fetching conversation");
      }
    }
  };

  const handleCreateConversation = async () => {
    if (currentUserId) {
      await execute({ participants: [...selectedUserIds] });
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const filteredUsers = users
    .filter((user) => user.id !== currentUserId)
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        user.identifier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const sortedConversations = conversations
    .filter((conv) => conv.lastMessage)
    .sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt).getTime() -
        new Date(a.lastMessage.createdAt).getTime(),
    );

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes === 0) {
      return "Now";
    } else if (diffInDays > 0) {
      return `${diffInDays}d`;
    } else if (diffInHours > 0) {
      return `${diffInHours}h`;
    } else {
      return `${diffInMinutes} min`;
    }
  };

  const hasSeenLastMessage = (conv: Conversation) => {
    return conv.lastMessage?.seenBy?.includes(currentUserId as string) || false;
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-1/4 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between my-4">
            <h1 className="text-lg font-semibold ml-4">Conversations</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger>
                <DialogTitle className="text-lg font-semibold mr-4">
                  <SquarePen />
                </DialogTitle>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <div className="mb-4 mt-8 flex flex-wrap">
                  {selectedUserIds.map((userId) => {
                    const user = users.find((u) => u.id === userId);
                    return (
                      user && (
                        <span
                          key={user.id}
                          className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center"
                        >
                          {user.firstName === "Unknown" ||
                            user.lastName === "Unknown"
                            ? user.identifier
                            : `${user.firstName} ${user.lastName}`}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleUserSelection(user.id);
                            }}
                            className="ml-1 text-red-600 hover:text-red-800"
                            aria-label="Remove user"
                          >
                            &times;
                          </button>
                        </span>
                      )
                    );
                  })}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 pl-6 p-2 rounded-full w-full"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={`user-${user.id}`}
                      className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => toggleUserSelection(user.id)}
                    >
                      <img
                        src={user.photo}
                        alt={user.identifier}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 mr-2"
                      />
                      <span className="flex-grow font-medium">
                        {user.firstName === "Unknown" ||
                          user.lastName === "Unknown"
                          ? user.identifier
                          : `${user.firstName} ${user.lastName}`}
                      </span>
                      {selectedUserIds.includes(user.id) && (
                        <input
                          type="checkbox"
                          checked={selectedUserIds.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                          className="ml-2 rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 mt-8">
                  <button
                    onClick={handleCreateConversation}
                    className="bg-blue-600 text-sm text-white p-2 rounded hover:bg-blue-700 transition w-full"
                  >
                    Discuss
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {sortedConversations.length === 0 ? (
              <p className="text-center">No conversation.</p>
            ) : (
              sortedConversations.map((conv) => {
                const participants = conv.participants
                  .map((participantId: string) =>
                    users.find((user) => user.id === participantId),
                  )
                  .filter(Boolean)
                  .slice(0, 2); // Limiter à 2 participants

                const participantNames = participants
                  .map((user: any) => {
                    return user.firstName && user.firstName !== "Unknown"
                      ? user.firstName
                      : user.identifier;
                  })
                  .join(", ");

                const lastMessageUser = users.find(
                  (user) => user.id === conv.lastMessage.userId,
                );

                return (
                  <div
                    key={conv.id}
                    onClick={() => handleJoinConversation(conv.id)}
                    className={`flex flex-col cursor-pointer px-2 py-4 ${conv.id === activeConversationId ? "bg-gray-200" : ""}`} // Surligner si non vu
                  >
                    <div className="flex items-center ml-4">
                      <div className="flex -space-x-4 mr-2">
                        {participants.map((user: any) => (
                          <img
                            key={user!.id}
                            src={user!.photo}
                            alt={user!.identifier}
                            className="w-8 h-8 mr rounded-full border-2 border-gray-300"
                          />
                        ))}
                      </div>
                      <p className="ml-2 flex-grow text-sm truncate">
                        {participantNames}
                        {participants.length > 2 ? ",..." : ""}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between items-center ml-4 text-sm">
                      <span
                        className={`truncate max-w-xs ${!hasSeenLastMessage(conv) ? "font-semibold text-black" : "text-gray-500"}`}
                      >
                        {lastMessageUser
                          ? `${lastMessageUser.firstName !== "Unknown" ? lastMessageUser.firstName : lastMessageUser.identifier}: ${conv.lastMessage.content}`
                          : conv.lastMessage.content}
                      </span>
                      <span
                        className={`ml-2 ${!hasSeenLastMessage(conv) ? "font-semibold text-black" : "text-gray-500"} flex-shrink-0`}
                      >
                        {formattedTimes[conv.id]}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="h-screen w-3/4 bg-gray-100 p-4 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
