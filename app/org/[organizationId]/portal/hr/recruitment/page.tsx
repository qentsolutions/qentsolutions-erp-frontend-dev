"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const RecruitmentPage = () => {

    // Static data for employees and departments
    const employeesData = [
        { id: 1, name: "Alice Johnson", position: "HR Manager" },
        { id: 2, name: "Bob Smith", position: "Recruiter" },
        { id: 3, name: "Charlie Brown", position: "Payroll Specialist" },
        { id: 4, name: "Diana Prince", position: "HR Assistant" },
    ];

    const applicationData = [
        { month: "Jan", applications: 65 },
        { month: "Feb", applications: 80 },
        { month: "Mar", applications: 95 },
        { month: "Apr", applications: 75 },
        { month: "May", applications: 85 },
        { month: "Jun", applications: 100 },
    ];

    const departmentsData = [
        { id: 1, name: "Recruitment" },
        { id: 2, name: "Employee Relations" },
        { id: 3, name: "Compensation and Benefits" },
        { id: 4, name: "Training and Development" },
    ];

    const conversionData = [
        { stage: "Application", rate: 100 },
        { stage: "Screening", rate: 75 },
        { stage: "Interview", rate: 50 },
        { stage: "Offer", rate: 25 },
        { stage: "Hire", rate: 15 },
    ];

    // State for employees and departments
    const [employees] = React.useState(employeesData);
    const [departments] = React.useState(departmentsData);

    return (
        <div className="w-full p-4 mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">500</div>
                        <p className="text-xs text-muted-foreground">+20.1% compared to last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Time to Fill</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45 days</div>
                        <p className="text-xs text-muted-foreground">-5 days from the average</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Candidates per Position</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">25</div>
                        <p className="text-xs text-muted-foreground">+15% over target</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Hiring Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">30 days</div>
                        <p className="text-xs text-muted-foreground">-2 days from last quarter</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={applicationData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="applications" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Conversion Rate by Stage</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={conversionData}>
                                <XAxis dataKey="stage" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="rate" stroke="#3b82f6" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RecruitmentPage;
