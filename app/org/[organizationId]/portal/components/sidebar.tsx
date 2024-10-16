import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { signOut } from "aws-amplify/auth";
import { ChevronLeft, ChevronRight, HomeIcon, Users2Icon, MessageCircle, Send, Calendar, Briefcase, Users, Sheet, Grip } from "lucide-react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export const Sidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
    const router = useRouter();
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isInOrganization, setIsInOrganization] = useState(false);
    const [organizationId, setOrganizationId] = useState<string | null>(null);

    useEffect(() => {
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
        setActiveModule(prev => prev === module ? null : module); // Basculer l'état du module actif
        router.push(href); // Navigation vers le lien correspondant
    };

    return (
        <div className={`h-full border-r flex flex-col overflow-y-auto bg-white shadow-lg transition-width duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 bg-gray-100">
                <DropdownMenu>
                    <DropdownMenuTrigger className={`text-lg font-bold ${isCollapsed ? 'hidden' : 'block'}`} onClick={onToggle}>
                        {<Grip />}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Modules</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleModuleSelect("Home", "/portal")}>
                            <div className="flex items-center">
                                <HomeIcon size={16} />
                                <span className="ml-2">Home</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="h-12" onClick={() => handleModuleSelect("Finance", `/org/${organizationId}/portal/finance`)}>
                            <div className="flex items-center">
                                <Briefcase size={16} />
                                <span className="ml-2">Finance</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-12" onClick={() => handleModuleSelect("Sales", `/org/${organizationId}/portal/sales`)}>
                            <div className="flex items-center">
                                <Users2Icon size={16} />
                                <span className="ml-2">Sales</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-12" onClick={() => handleModuleSelect("Human Resources", `/org/${organizationId}/portal/hr`)}>
                            <div className="flex items-center">
                                <Users size={16} />
                                <span className="ml-2">Human Resources</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-12" onClick={() => handleModuleSelect("Marketing", `/org/${organizationId}/portal/marketing`)}>
                            <div className="flex items-center">
                                <Users2Icon size={16} />
                                <span className="ml-2">Marketing</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-12" onClick={() => handleModuleSelect("Services", `/org/${organizationId}/portal/services`)}>
                            <div className="flex items-center">
                                <Users2Icon size={16} />
                                <span className="ml-2">Services</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-12" onClick={() => handleModuleSelect("Productivity", `/org/${organizationId}/portal/productivity`)}>
                            <div className="flex items-center">
                                <Users2Icon size={16} />
                                <span className="ml-2">Productivity</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <button onClick={onToggle} className="text-gray-500 p-2 rounded transition-colors hover:bg-gray-200">
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>
            <div className="flex flex-col w-full h-full text-sm p-4 space-y-2">
                <a href="/portal" className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                    <HomeIcon size={30} />
                    <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
                </a>
                <a href="/portal/calendar" className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                    <Calendar size={30} />
                    <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Calendar</span>
                </a>

                <a href="/portal/conversation" className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                    <Send size={30} />
                    <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Messages</span>
                </a>

                {/* Sous-menu dynamique selon le module sélectionné */}
                {activeModule === "Human Resources" && (
                    <>
                        <a href={`/org/${organizationId}/portal/hr/job-offers`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ">
                            <Briefcase />
                            <span className={` block text-gray-800 ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Job Offers</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/hr/job-applications`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ">
                            <Sheet />
                            <span className={` block text-gray-800 ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Job Applications</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/hr/candidates`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ">
                            <Users />
                            <span className={` block text-gray-800 ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Candidates</span>
                        </a>
                    </>
                )}
                {activeModule === "Sales" && (
                    <>
                        <a href={`/org/${organizationId}/portal/sales/leads`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ">
                            <Users2Icon />
                            <span className={` block text-gray-800 ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Leads</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/sales/reports`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 ">
                            <Users2Icon />
                            <span className={` block text-gray-800 ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>Sales Reports</span>
                        </a>
                    </>
                )}
                {activeModule === "Finance" && (
                    <>
                        <a href={`/org/${organizationId}/portal/finance/accounting`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                            <Briefcase />
                            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Accounting</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/finance/billing`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                            <Sheet />
                            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Billing</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/finance/expenses`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                            <Briefcase />
                            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Expenses</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/finance/documents`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                            <Sheet />
                            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Documents</span>
                        </a>
                    </>
                )}
                {activeModule === "Marketing" && (
                    <>
                        <a href={`/org/${organizationId}/portal/marketing/events`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                            <Users2Icon />
                            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Events</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/marketing/surveys`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                            <Sheet />
                            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Surveys</span>
                        </a>
                        <a href={`/org/${organizationId}/portal/marketing/automation`} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200">
                            <Briefcase />
                            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Marketing Automation</span>
                        </a>
                    </>
                )}
            </div>
            <Separator className="my-4" />
            <div className="mt-auto mb-4">
                <button onClick={handleSignOut} className="flex items-center p-2 rounded hover:bg-gray-200 transition duration-200 w-full">
                    <Users2Icon size={30} />
                    <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Sign Out</span>
                </button>
            </div>
        </div>
    );
};
