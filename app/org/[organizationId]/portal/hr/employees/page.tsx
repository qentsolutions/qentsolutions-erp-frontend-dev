"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ChevronLeft, History, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfessionalInfo from "./components/professional";
import PersonalInfo from "./components/personal";
import HrSettings from "./components/hrSettings";

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
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [entryDate, setEntryDate] = useState("");


    const filteredEmployees = employees.filter(emp => {
        const isDepartmentMatch = selectedDepartment === "All" || emp.department === selectedDepartment;
        const isSearchMatch = emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.surname.toLowerCase().includes(searchTerm.toLowerCase());
        return isDepartmentMatch && isSearchMatch;
    });

    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col overflow-hidden">
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
                            <Sheet key={employee.id}>
                                <SheetTrigger>
                                    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer relative">
                                        {/* Badge pour le département */}
                                        <Badge className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded-md text-xs">
                                            {employee.department}
                                        </Badge>

                                        <CardContent className="p-6">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <Avatar className="w-16 h-16">
                                                    <AvatarImage src={employee.photo} alt={`${employee.firstName} ${employee.surname}`} />
                                                    <AvatarFallback>{employee.firstName[0]}{employee.surname[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h2 className="text-base font-semibold">{employee.surname}, {employee.firstName}</h2>
                                                    <p className="text-sm text-gray-600">{employee.jobTitle}</p>
                                                </div>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </SheetTrigger>

                                {/* Détails de l'employé dans le Sheet */}
                                <SheetContent className="w-full bg-white overflow-y-auto">
                                    <div className="flex w-full">
                                        <div className="w-full">
                                            <SheetHeader className="space-y-0 pb-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="overflow-hidden rounded-full" style={{ width: 150, height: 150 }}>
                                                        <Image
                                                            src="/employee.jpg"
                                                            alt="Employee"
                                                            width={150}
                                                            height={150}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <SheetTitle className="text-2xl font-semibold">{employee.firstName} {employee.surname}</SheetTitle>
                                                        <SheetDescription className="text-lg">{employee.jobTitle}</SheetDescription>
                                                    </div>
                                                </div>
                                            </SheetHeader>

                                            <div className="grid gap-6 py-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                                        <span>{employee.email}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                                        <span>{employee.phone}</span>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <Tabs defaultValue="professional" className="w-full">
                                                    <TabsList className="grid w-full grid-cols-3">
                                                        <TabsTrigger value="professional">Professional</TabsTrigger>
                                                        <TabsTrigger value="personal">Personal</TabsTrigger>
                                                        <TabsTrigger value="hr">HR Settings</TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="professional">
                                                        <ProfessionalInfo />
                                                    </TabsContent>
                                                    <TabsContent value="personal" className="">
                                                        <PersonalInfo />
                                                    </TabsContent>
                                                    <TabsContent value="hr">
                                                        <HrSettings />
                                                    </TabsContent>
                                                </Tabs>
                                            </div>
                                        </div>

                                        <div className="my-4">
                                            <button onClick={toggleHistory} className="flex items-center space-x-2 mt-4">
                                                <span>{isHistoryOpen ? <ChevronLeft className="w-4 h-4 mr-2" /> : <History className="w-4 h-4 hover:text-blue-500" />}</span>
                                            </button>
                                        </div>

                                        {isHistoryOpen && (

                                            <div className="w-1/3 mt-6 overflow-y-auto border-gray-100 border rounded-sm h-[90vh] p-6">
                                                History
                                                <div className="flex items-center space-x-4">
                                                    <div className="overflow-hidden rounded-full" style={{ width: 40, height: 40 }}>
                                                        <Image
                                                            src="/employee.jpg"
                                                            alt="Employee"
                                                            width={40}
                                                            height={40}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Mon 17 2024 | 4:20 pm</p>
                                                        <p className="text-sm font-semibold">{employee.firstName} {employee.surname}</p>
                                                        <p className="text-sm">A modifié poste : Software Engineer</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4 mt-4">
                                                    <div className="overflow-hidden rounded-full" style={{ width: 40, height: 40 }}>
                                                        <Image
                                                            src="/employee.jpg"
                                                            alt="Employee"
                                                            width={40}
                                                            height={40}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Mon 17 2024 | 4:20 pm</p>
                                                        <p className="text-sm font-semibold">{employee.firstName} {employee.surname}</p>
                                                        <p className="text-sm">Félicitations vous avez créé le salarié William Quesnot</p>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
