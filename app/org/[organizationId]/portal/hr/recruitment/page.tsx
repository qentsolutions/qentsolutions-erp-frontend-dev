"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
const RecruitmentPage = () => {

    // Données fixes pour les employés et les départements
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
    ]
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
    ]
    // État pour les employés et les départements
    const [employees] = React.useState(employeesData);
    const [departments] = React.useState(departmentsData);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total des candidatures</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">500</div>
                        <p className="text-xs text-muted-foreground">+20.1% par rapport au mois dernier</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Temps moyen pour pourvoir un poste</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45 jours</div>
                        <p className="text-xs text-muted-foreground">-5 jours par rapport à la moyenne</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Candidats par poste</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">25</div>
                        <p className="text-xs text-muted-foreground">+15% par rapport à l'objectif</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Délai moyen de recrutement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">30 jours</div>
                        <p className="text-xs text-muted-foreground">-2 jours par rapport au trimestre précédent</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Nombre total de candidatures</CardTitle>
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
                        <CardTitle>Taux de conversion par étape</CardTitle>
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
