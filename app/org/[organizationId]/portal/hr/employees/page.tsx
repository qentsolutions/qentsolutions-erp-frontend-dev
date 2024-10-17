"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { CalendarDays, CalendarIcon, ChevronLeft, Clock, Download, Globe, History, Mail, MapPin, Paperclip, Phone, ReceiptText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import OrganizationalChart from "./components/organizationalChart";

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
                                                    <h2 className="text-xl font-semibold">{employee.surname}, {employee.firstName}</h2>
                                                    <p className="text-sm text-gray-600">{employee.jobTitle}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm"><strong>Email:</strong> {employee.email}</p>
                                                <p className="text-sm"><strong>Phone:</strong> {employee.phone}</p>
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
                                                        <div className="space-y-4 py-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label htmlFor="department">Department</Label>
                                                                    <Select defaultValue={employee.department}>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select department" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="IT">IT</SelectItem>
                                                                            <SelectItem value="HR">HR</SelectItem>
                                                                            <SelectItem value="Finance">Finance</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="manager">Manager</Label>
                                                                    <Select defaultValue="William Quesnot">
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select manager" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="John Doe">John Doe</SelectItem>
                                                                            <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Work Details</Label>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="flex items-center space-x-2">
                                                                        <MapPin className="w-5 h-5 text-muted-foreground" />
                                                                        <Select defaultValue="Remote">
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Work location" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="Office">Office</SelectItem>
                                                                                <SelectItem value="Remote">Remote</SelectItem>
                                                                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <Clock className="w-5 h-5 text-muted-foreground" />
                                                                        <Select defaultValue="35 hours">
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Work hours" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="35">35 hours</SelectItem>
                                                                                <SelectItem value="40">40 hours</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Globe className="w-5 h-5 text-muted-foreground" />
                                                                <Select defaultValue="Paris UTC+1">
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Time zone" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="UTC+1">Paris UTC+1</SelectItem>
                                                                        <SelectItem value="UTC+0">London UTC+0</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Contract</Label>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="flex items-center flex-col  space-y-4">
                                                                        <div className="flex items-center w-full">
                                                                            <ReceiptText className="mr-2 w-5 h-5 text-muted-foreground" />
                                                                            <Select defaultValue="Type of contract">
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Type of contract" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="Full time">Full time</SelectItem>
                                                                                    <SelectItem value="Part time">Part time</SelectItem>
                                                                                    <SelectItem value="Internship">Internship</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>

                                                                        <div className="flex items-center w-full">
                                                                            <CalendarDays className="mr-2 w-5 h-5 text-muted-foreground" />
                                                                            <input
                                                                                type="date"
                                                                                id="entry-date"
                                                                                value="12"
                                                                                onChange={(e) => setEntryDate(e.target.value)}
                                                                                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                                                            />
                                                                        </div>

                                                                        <div className="flex items-center w-full">
                                                                            <Paperclip className="mr-2 w-5 h-5 text-muted-foreground" />

                                                                            <label htmlFor="file-upload" className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                                                            >
                                                                                {"Attach the contract"}
                                                                                <button className="shadow-sm px-2 border border-gray-100 rounded-lg">
                                                                                    <span className="ml-2 text-muted-foreground flex items-center text-sm"><Download />Upload</span>
                                                                                </button>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex w-full items-center overflow-y-auto h-72 justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                                                                        <OrganizationalChart centerOnEmployee="Eva" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="personal">
                                                        <div className="space-y-4 py-4">
                                                            <p className="text-muted-foreground">Personal information content goes here.</p>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="hr">
                                                        <div className="space-y-4 py-4">
                                                            <div>
                                                                <Label htmlFor="leaveValidator">Leave Validator</Label>
                                                                <Select>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select leave validator" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="John Doe">John Doe</SelectItem>
                                                                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div>
                                                                <Label>Entry Date</Label>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-full justify-start text-left font-normal",

                                                                            )}
                                                                        >
                                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                                            <span>Pick a date</span>
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0">
                                                                        <Calendar

                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </div>
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
