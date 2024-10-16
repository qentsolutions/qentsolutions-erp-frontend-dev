import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { signOut } from "aws-amplify/auth";
import { ChevronLeft, ChevronRight, HomeIcon, Users2Icon, MessageCircle, Send, Calendar, Briefcase, Users, Sheet, Grip, DollarSignIcon, ShoppingCartIcon, UsersIcon, MegaphoneIcon, BriefcaseIcon, CheckSquareIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const Sidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
    const router = useRouter();
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isInOrganization, setIsInOrganization] = useState(false);
    const [organizationId, setOrganizationId] = useState<string | null>(null);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // État pour le sous-menu actif

    useEffect(() => {
        // Lire le module actif à partir du localStorage
        const storedActiveModule = localStorage.getItem("activeModule");
        if (storedActiveModule) {
            setActiveModule(storedActiveModule);
        }

        const checkUserOrganization = async () => {
            const cognitoId = localStorage.getItem("qsid");
            if (cognitoId) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/user/${cognitoId}`, { withCredentials: true });
                    const user = response.data;

                    if (user.organizationId) {
                        setIsInOrganization(true);
                        setOrganizationId(user.organizationId);
                    }
                } catch (error) {
                    console.error("Error fetching user organization:", error);
                }
            }
            // Simuler un temps de chargement de 2 secondes
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        checkUserOrganization();
    }, [router]);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleModuleSelect = (module: string, href: string) => {
        setActiveModule(module); // Définir le module actif
        localStorage.setItem("activeModule", module); // Enregistrer dans localStorage
        router.push(href); // Navigation vers le lien correspondant
    };

    const handleSubMenuSelect = (subMenu: string) => {
        setActiveSubMenu(subMenu); // Définir le sous-menu actif
    };

    return (
        <div className={`h-full border-r flex flex-col overflow-y-auto bg-white shadow-lg transition-width duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 bg-gray-100">
                <DropdownMenu>
                    <DropdownMenuTrigger className={`text-md font-bold ${isCollapsed ? 'hidden' : 'block'}`} onClick={onToggle}>
                        {<Grip />}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="grid grid-cols-3 gap-2 w-3/4">
                        <DropdownMenuItem className="flex items-center justify-center p-4" onClick={() => handleModuleSelect("Home", "/portal")}>
                            <div className="flex flex-col items-center space-y-2 text-blue-500">
                                <HomeIcon size={25} />
                                <span className="text-xs font-semibold">Home</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-center p-4" onClick={() => handleModuleSelect("Finance", `/org/${organizationId}/portal/finance`)}>
                            <div className="flex flex-col items-center space-y-2 text-green-500">
                                <DollarSignIcon size={25} />
                                <span className="text-xs font-semibold">Finance</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-center p-4" onClick={() => handleModuleSelect("Sales", `/org/${organizationId}/portal/sales`)}>
                            <div className="flex flex-col items-center space-y-2 text-yellow-500">
                                <ShoppingCartIcon size={25} />
                                <span className="text-xs font-semibold">Sales</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-center p-4" onClick={() => handleModuleSelect("Human Resources", `/org/${organizationId}/portal/hr`)}>
                            <div className="flex flex-col items-center space-y-2 text-red-500">
                                <UsersIcon size={25} />
                                <span className="text-xs font-semibold">HR</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-center p-4" onClick={() => handleModuleSelect("Marketing", `/org/${organizationId}/portal/marketing`)}>
                            <div className="flex flex-col items-center space-y-2 text-purple-500">
                                <MegaphoneIcon size={25} />
                                <span className="text-xs font-semibold">Marketing</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-center p-4" onClick={() => handleModuleSelect("Services", `/org/${organizationId}/portal/services`)}>
                            <div className="flex flex-col items-center space-y-2 text-indigo-500">
                                <BriefcaseIcon size={25} />
                                <span className="text-xs font-semibold">Services</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-center p-4" onClick={() => handleModuleSelect("Productivity", `/org/${organizationId}/portal/productivity`)}>
                            <div className="flex flex-col items-center space-y-2 text-teal-500">
                                <CheckSquareIcon size={25} />
                                <span className="text-xs font-semibold">Productivity</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <button onClick={onToggle} className="text-gray-500 p-2 rounded transition-colors hover:bg-gray-200">
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>

            <div className="flex flex-col w-full h-full text-sm p-4 space-y-2">
                {/* Main Links */}
                <Link href="/portal" className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                    <HomeIcon size={30} />
                    <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
                </Link>
                <Link href="/portal/calendar" className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                    <Calendar size={30} />
                    <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Calendar</span>
                </Link>
                <Link href="/portal/conversation" className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                    <Send size={30} />
                    <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Messages</span>
                </Link>

                {/* Sous-menu dynamique selon le module sélectionné */}
                {activeModule === "Human Resources" && (
                    <>
                        <Link
                            href={`/org/${organizationId}/portal/hr/recruitment`}
                            className={`flex items-center p-2 rounded hover:text-blue-500 transition duration-200 ${activeSubMenu === "Recruitment" ? 'text-blue-500 bg-blue-50' : 'text-gray-800'}`}
                            onClick={() => handleSubMenuSelect("Recruitment")}
                        >
                            <Briefcase />
                            <span className={` block ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Recruitment</span>
                        </Link>
                        <Link
                            href={`/org/${organizationId}/portal/hr/employees`}
                            className={`flex items-center p-2 rounded hover:text-blue-500 transition duration-200 ${activeSubMenu === "Employees" ? 'text-blue-500 bg-blue-50' : 'text-gray-800'}`}  // Changed condition here
                            onClick={() => handleSubMenuSelect("Employees")}
                        >
                            <Briefcase />
                            <span className={` block ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Employees</span>
                        </Link>
                        <Link
                            href={`/org/${organizationId}/portal/hr/absence`}
                            className={`flex items-center p-2 rounded hover:text-blue-500 transition duration-200 ${activeSubMenu === "Absence" ? 'text-blue-500 bg-blue-50' : 'text-gray-800'}`} // Changed condition here
                            onClick={() => handleSubMenuSelect("Absence")}
                        >
                            <Briefcase />
                            <span className={` block ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Absence</span>
                        </Link>
                    </>
                )}

                {activeModule === "Sales" && (
                    <Link
                        href={`/org/${organizationId}/portal/sales/leads`}
                        className={`flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ${activeSubMenu === "Leads" ? 'text-blue-500' : 'text-gray-800'}`}
                        onClick={() => handleSubMenuSelect("Leads")}
                    >
                        <Users2Icon />
                        <span className={` block ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Leads</span>
                    </Link>
                )}
                {activeModule === "Finance" && (
                    <Link
                        href={`/org/${organizationId}/portal/finance/reports`}
                        className={`flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ${activeSubMenu === "Reports" ? 'text-blue-500' : 'text-gray-800'}`}
                        onClick={() => handleSubMenuSelect("Reports")}
                    >
                        <Sheet />
                        <span className={` block ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Reports</span>
                    </Link>
                )}
                {activeModule === "Marketing" && (
                    <Link
                        href={`/org/${organizationId}/portal/marketing/ads`}
                        className={`flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ${activeSubMenu === "Ads" ? 'text-blue-500' : 'text-gray-800'}`}
                        onClick={() => handleSubMenuSelect("Ads")}
                    >
                        <MegaphoneIcon />
                        <span className={` block ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Ads</span>
                    </Link>
                )}
                {activeModule === "Productivity" && (
                    <Link
                        href={`/org/${organizationId}/portal/productivity/tasks`}
                        className={`flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ${activeSubMenu === "Tasks" ? 'text-blue-500' : 'text-gray-800'}`}
                        onClick={() => handleSubMenuSelect("Tasks")}
                    >
                        <CheckSquareIcon />
                        <span className={` block ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Tasks</span>
                    </Link>
                )}
            </div>
        </div>
    );
};
