import React from "react";
import { CreditCard, Keyboard, LogOut, Mail, MessageSquare, Plus, Search, Settings, User, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LogoutButton from "./logout";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isConversationPath = searchParams.get("path") === "dashboard/conversation"; // Exemple d'utilisation
  const params = useParams(); // Pour récupérer les paramètres dynamiques de l'URL
  const organizationId = params.organizationId; // Récupérer organizationId depuis l'URL

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleRoutePush = (route:string) => {
    router.push(`/org/${organizationId}/portal/${route}`);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 dark:bg-black border-1 border-b-2 border-gray-100">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-bold">My App</h1>
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <Link
          href="/settings"
          className={`h-min w-min rounded p-2 hover:bg-gray-100`}
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
        <div className="hidden items-center justify-between md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                <User className="h-6 w-6 cursor-pointer text-gray-800 dark:text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleRoutePush("profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleRoutePush("organization")}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Organization</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sous-menus pour Conversations */}
      {isConversationPath && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg">
          <ul>
            <li>
              <Link href="/portal/conversation/new" className="block p-2 hover:bg-gray-100">New Message</Link>
            </li>
            <li>
              <Link href="/portal/conversation/archive" className="block p-2 hover:bg-gray-100">Archived Messages</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
