"use client";

import { AuthProvider } from "./authContext";
import Navbar from "./portal/components/navbar";



const PortalLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
            <Navbar />
            <main>
                <Navbar />
                {children}
            </main>
        </div>
    );
};


const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <PortalLayout>{children}</PortalLayout>
        </AuthProvider>
    );
};

export default DashboardWrapper;
