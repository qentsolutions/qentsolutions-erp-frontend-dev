"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const employees = [
    {
        id: 1,
        surname: "Doe",
        firstName: "John",
        jobTitle: "Software Engineer",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        photo: "/placeholder.svg?height=100&width=100",
        department: "Engineering",
    },
    {
        id: 2,
        surname: "Smith",
        firstName: "Jane",
        jobTitle: "Product Manager",
        email: "jane.smith@example.com",
        phone: "+1 234 567 891",
        photo: "/placeholder.svg?height=100&width=100",
        department: "Product",
    },
    {
        id: 3,
        surname: "Johnson",
        firstName: "Robert",
        jobTitle: "Marketing Specialist",
        email: "robert.johnson@example.com",
        phone: "+1 234 567 892",
        photo: "/placeholder.svg?height=100&width=100",
        department: "Marketing",
    },
    {
        id: 4,
        surname: "Williams",
        firstName: "Emily",
        jobTitle: "HR Manager",
        email: "emily.williams@example.com",
        phone: "+1 234 567 893",
        photo: "/placeholder.svg?height=100&width=100",
        department: "Human Resources",
    },
];

export default function Dashboard() {
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEmployees = employees.filter(emp => {
        const isDepartmentMatch = selectedDepartment === "All" || emp.department === selectedDepartment;
        const isSearchMatch = emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.surname.toLowerCase().includes(searchTerm.toLowerCase());
        return isDepartmentMatch && isSearchMatch;
    });

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800">Employee Dashboard</h1>
                    </div>

                    <div className="my-4 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {["All", "Engineering", "Product", "Marketing", "Human Resources"].map(department => (
                                <Badge
                                    key={department}
                                    onClick={() => setSelectedDepartment(department)}
                                    className={`cursor-pointer rounded-full py-1 px-6 hover:bg-blue-500 hover:text-white ${selectedDepartment === department ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    {department}
                                </Badge>
                            ))}
                        </div>
                        <Input
                            placeholder="Search..."
                            className="ml-4 w-72"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEmployees.map((employee) => (
                            <Link href={`/employee/${employee.id}`} key={employee.id}>
                                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <Avatar className="w-16 h-16">
                                                <AvatarImage src={employee.photo} alt={`${employee.firstName} ${employee.surname}`} />
                                                <AvatarFallback>{employee.firstName[0]}{employee.surname[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="text-xl font-semibold">{employee.surname}, {employee.firstName}</h2>
                                                <p className="text-sm text-gray-600">{employee.jobTitle}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm"><strong>Email:</strong> {employee.email}</p>
                                            <p className="text-sm"><strong>Phone:</strong> {employee.phone}</p>
                                            <p className="text-sm"><strong>Department:</strong> {employee.department}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
