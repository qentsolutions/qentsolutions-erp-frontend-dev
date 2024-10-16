import React from "react";
import { CreditCard, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./logout";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Utiliser usePathname pour obtenir le chemin actuel
  const params = useParams();
  const organizationId = params.organizationId; // Récupérer organizationId depuis l'URL
  const isRecruitmentPath = pathname.includes("recruitment"); // Vérifier si le chemin inclut "recruitment"

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleRoutePush = (route: string) => {
    router.push(`/org/${organizationId}/portal/${route}`);
  };

  // Fonction pour vérifier si le lien est actif
  const isActiveLink = (linkPath: string) => {
    return pathname === linkPath;
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 dark:bg-black border-1 border-b-2 border-gray-100">
      <div className="flex items-center gap-8">
        {/* Menu spécifique à "Recruitment" */}
        {isRecruitmentPath && (
          <div className="flex gap-4">
            <Link
              href={`/org/${organizationId}/portal/hr/recruitment`}
              className={`text-sm font-medium hover:text-blue-600 ${isActiveLink(`/org/${organizationId}/portal/hr/recruitment`) ? 'text-blue-500' : ''}`}
            >
              Overview
            </Link>
            <Link
              href={`/org/${organizationId}/portal/hr/recruitment/job-offers`}
              className={`text-sm font-medium hover:text-blue-600 ${isActiveLink(`/org/${organizationId}/portal/hr/recruitment/job-offers`) ? 'text-blue-500' : ''}`}
            >
              Job Offers
            </Link>
            <Link
              href={`/org/${organizationId}/portal/hr/recruitment/job-applications`}
              className={`text-sm font-medium hover:text-blue-600 ${isActiveLink(`/org/${organizationId}/portal/hr/recruitment/job-applications`) ? 'text-blue-500' : ''}`}
            >
              Job Applications
            </Link>
            <Link
              href={`/org/${organizationId}/portal/hr/recruitment/candidates`}
              className={`text-sm font-medium hover:text-blue-600 ${isActiveLink(`/org/${organizationId}/portal/hr/recruitment/candidates`) ? 'text-blue-500' : ''}`}
            >
              Candidates
            </Link>
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <Link href="/settings" className={`h-min w-min rounded p-2 hover:bg-gray-100`}>
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
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
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
    </div>
  );
};

export default Navbar;
