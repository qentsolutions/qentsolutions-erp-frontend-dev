"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeadROI from "./components/LeadROI";
import LeadRevenue from "./components/LeadRevenue";
import LeadNonClosed from "./components/LeadNonClosed";
import LeadCostAnalytics from "./components/LeadCostAnalytics";
import LeadLineChart from "./components/LeadBySource";
import LeadStatusAnalytics from "./components/LeadStatusAnalytics";

const Home = () => {
    const [startDate, setStartDate] = useState(() => {
        const currentDate = new Date();
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
            .toISOString()
            .split("T")[0];
    });

    const [endDate, setEndDate] = useState(() => {
        const currentDate = new Date();
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            .toISOString()
            .split("T")[0];
    });

    const handleLast7Days = () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 7);
        end.setDate(end.getDate() + 1);
        setStartDate(start.toISOString().split("T")[0]);
        setEndDate(end.toISOString().split("T")[0]);
    };

    const handleThisMonth = () => {
        const currentDate = new Date();
        const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        setStartDate(start.toISOString().split("T")[0]);
        setEndDate(end.toISOString().split("T")[0]);
    };

    const handleToday = () => {
        const currentDate = new Date();
        const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2);
        setStartDate(start.toISOString().split("T")[0]);
        setEndDate(end.toISOString().split("T")[0]);
    };

    const handleDateChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "startDate") {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    };

    return (
        <div className="w-full p-4 mx-auto space-y-4">
            {/* Header with date pickers and buttons */}
            <div className="flex space-x-4 items-center justify-end">
                <Button onClick={handleToday} className="btn bg-white text-black border shadow-sm border-gray-200 hover:bg-gray-200">
                    Today
                </Button>
                <Button onClick={handleLast7Days} className="btn bg-white text-black border shadow-sm border-gray-200 hover:bg-gray-200">
                    Last 7 Days
                </Button>
                <Button onClick={handleThisMonth} className="btn bg-white text-black border shadow-sm border-gray-200 hover:bg-gray-200">
                    This Month
                </Button>
                <div className="bg-white border shadow-sm border-gray-200 rounded-lg">
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={handleDateChange}
                        className="border-none rounded-lg"
                    />
                    -
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={handleDateChange}
                        className="border-none rounded-lg"
                    />
                </div>
            </div>

            {/* Main layout with vertical Lead Status Analytics and smaller KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Lead Status Analytics taking 2 columns */}
                <div className="lg:col-span-2"> {/* Changed to lg:col-span-2 for half width */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Lead Status Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LeadStatusAnalytics />
                        </CardContent>
                    </Card>
                </div>

                {/* Right side with 4 cards (2x2) and Leads Over Time below */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Changed to lg:col-span-3 */}
                    {/* 2x2 grid for smaller KPIs */}
                
                            <LeadNonClosed startDate={startDate} endDate={endDate} />
                  
                            <LeadRevenue startDate={startDate} endDate={endDate} />
                    
                  
                            <LeadCostAnalytics startDate={startDate} endDate={endDate} />
                 
                            <LeadROI startDate={startDate} endDate={endDate} />
                   

                    {/* Leads Over Time below the 2x2 grid */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sources Analytics</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[260px]">
                                <LeadLineChart startDate={startDate} endDate={endDate} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
