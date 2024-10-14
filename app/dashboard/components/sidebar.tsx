"use client";

import { Separator } from "@/components/ui/separator";
import { signOut } from "aws-amplify/auth";
import { ChevronLeft, ChevronRight, HomeIcon, Users2Icon, MessageCircle, Send, Calendar, Briefcase, Users, Sheet } from "lucide-react";
import React, { useState } from "react";

export const Sidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
    const [isRecruitmentOpen, setRecruitmentOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const toggleRecruitmentMenu = () => {
        setRecruitmentOpen(!isRecruitmentOpen);
    };

    return (
        <div className={`h-full border-r flex flex-col overflow-y-auto bg-white shadow-lg transition-width duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 bg-gray-100">
                <h2 className={`text-lg font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</h2>
                <button onClick={onToggle} className="text-gray-500 p-2 rounded transition-colors hover:bg-gray-200">
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>
            <div className="flex flex-col w-full h-full text-sm p-4 space-y-2">
                <NavItem href="/dashboard" icon={<HomeIcon size={30} />} label="Home" isCollapsed={isCollapsed} />
                <NavItem href="/dashboard/calendar" icon={<Calendar size={30} />} label="Calendar" isCollapsed={isCollapsed} />
                <NavItem href="/leads" icon={<Users2Icon size={30} />} label="Leads" isCollapsed={isCollapsed} />
                <NavItem href="/dashboard/conversation" icon={<Send size={30} />} label="Messages" isCollapsed={isCollapsed} />

                {/* Menu Recrutement */}
                <div className={`mb-2 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                    <button onClick={toggleRecruitmentMenu} className={`flex items-center w-full p-2 rounded hover:bg-gray-200 transition duration-200`}>
                        {isCollapsed ? (
                            <Users2Icon size={30} className="mx-auto scale-150" />
                        ) : (
                            <>
                                <Users2Icon size={30} />
                                <span className={`ml-4 block text-gray-800`}>Recruitment</span>
                                <span className={`ml-auto transition-transform ${isRecruitmentOpen ? 'transform rotate-90' : ''}`}>
                                    {isRecruitmentOpen ? <ChevronRight /> : <ChevronRight />}
                                </span>
                            </>
                        )}
                    </button>
                </div>

                {/* Sous-menus Recrutement */}
                {isRecruitmentOpen && (
                    <>
                        <NavItem href="/dashboard/recruitment/job-offers" icon={<Briefcase />} label="Job Offers" isCollapsed={isCollapsed} indent />
                        <NavItem href="/dashboard/recruitment/job-applications" icon={<Sheet  />} label="Job Applications" isCollapsed={isCollapsed} indent />
                        <NavItem href="/dashboard/recruitment/candidates" icon={<Users  />} label="Candidates" isCollapsed={isCollapsed} indent />
                    </>
                )}
            </div>
            <Separator className="my-4" />
            <div className="mt-auto mb-4">
                <button onClick={handleSignOut} className="w-full text-red-500 hover:text-red-700 transition-colors">
                    Sign out
                </button>
            </div>
        </div>
    );
};

// Composant NavItem pour la réutilisation
const NavItem = ({ href, icon, label, isCollapsed, indent }: { href: string; icon: React.ReactNode; label: string; isCollapsed: boolean; indent?: boolean }) => (
    <div className={`mb-2 flex items-center ${isCollapsed ? 'justify-center' : ''} ${indent ? 'ml-6' : ''}`}>
        <a href={href} className={`flex items-center w-full p-2 rounded hover:bg-gray-200 transition duration-200`}>
            {icon}
            <span className={`ml-4 block text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>
                {label}
            </span>
        </a>
    </div>
);
