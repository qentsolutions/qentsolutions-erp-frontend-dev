// app/org/[organizationId]/portal/sales/page.tsx

import React from 'react';
import { Separator } from "@/components/ui/separator";

const SalesPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Sales Overview</h1>
            <Separator className="my-2" />
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Product</th>
                        <th className="py-2 px-4 border-b">Quantity Sold</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Total</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </div>
    );
};

export default SalesPage;
