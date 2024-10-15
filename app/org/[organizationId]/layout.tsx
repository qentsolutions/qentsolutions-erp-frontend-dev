// app/portal/organization/[organizationId]/layout.tsx
"use client";
import React, { ReactNode } from 'react';
import Navbar from './portal/components/navbar';

interface OrganizationLayoutProps {
    children: ReactNode; // Type pour les enfants
}

const OrganizationLayout: React.FC<OrganizationLayoutProps> = ({ children }) => {
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default OrganizationLayout;
