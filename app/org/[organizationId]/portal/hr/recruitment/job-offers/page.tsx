"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { BriefcaseIcon, CalendarIcon, ClockIcon, DollarSignIcon, MapPin, MapPinIcon, Plus, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Define the job offer type
type JobOffer = {
    id: string;
    title: string;
    manager: string;
    applications: number;
    location: string;
    datePosted: string;
    department: string;
    recruiter: string;
    details: string;
    salary: string;
    limitDate: string;
    description: string;
    notes: string;
};

// Define the column type
type Column = {
    id: string;
    title: string;
    jobOffers: JobOffer[];
};

// Initial data for job offers
const initialData: { [key: string]: Column } = {
    "open-role": {
        id: "open-role",
        title: "Open Role",
        jobOffers: [
            {
                id: "1",
                title: "Senior React Developer",
                manager: "John Doe",
                recruiter: "Emily Davis",
                applications: 15,
                location: "Remote",
                datePosted: "2023-05-01",
                department: "IT",
                details: "Senior position focusing on front-end development with React.",
                salary: "$120,000 - $140,000",
                limitDate: "2023-07-01",
                description: "We are looking for a Senior React Developer with extensive experience in building high-performance web applications. You will be part of a dynamic team, collaborating closely with backend developers and product managers to deliver scalable solutions. A deep understanding of modern JavaScript, React, and state management libraries like Redux or Zustand is required. Experience with Next.js and Tailwind CSS is a plus.",
                notes: "Do a mathematics test."
            },
            {
                id: "2",
                title: "UX Designer",
                manager: "Jane Smith",
                recruiter: "Michael Carter",
                applications: 8,
                location: "New York",
                datePosted: "2023-05-03",
                department: "Design",
                details: "Mid-level UX design role for improving user experiences.",
                salary: "$70,000 - $90,000",
                limitDate: "2023-06-30",
                description: "As a UX Designer, you will be responsible for designing intuitive and engaging user experiences for our digital products. You will work closely with product managers, developers, and stakeholders to translate user needs into clear wireframes and prototypes. Experience with Figma, user research, and usability testing is essential. A portfolio showcasing your design process and problem-solving skills is required.",
                notes: "No notes."

            },
        ],
    },
    "in-progress": {
        id: "in-progress",
        title: "In Progress",
        jobOffers: [
            {
                id: "3",
                title: "Product Manager",
                manager: "Alice Johnson",
                recruiter: "Sophia Lee",
                applications: 12,
                location: "San Francisco",
                datePosted: "2023-04-28",
                department: "Product",
                details: "Lead the development of new product features and roadmaps.",
                salary: "$110,000 - $130,000",
                limitDate: "2023-06-15",
                description: "We are looking for a Product Manager to lead the development and execution of product roadmaps. You will work closely with cross-functional teams to define product goals, gather requirements, and ensure timely delivery of features. A strong understanding of Agile methodologies, market research, and customer feedback is crucial. Prior experience in managing SaaS products is highly preferred.",
                notes: "No notes."

            },
        ],
    },
    "position-filled": {
        id: "position-filled",
        title: "Position Filled",
        jobOffers: [
            {
                id: "4",
                title: "Data Analyst",
                manager: "Bob Wilson",
                recruiter: "James Taylor",
                applications: 20,
                location: "Chicago",
                datePosted: "2023-04-15",
                department: "Data",
                details: "Analyze large datasets to provide actionable insights for decision-making.",
                salary: "$90,000 - $110,000",
                limitDate: "2023-05-31",
                description: "We are seeking a Data Analyst to interpret complex data sets and provide key insights to drive business decisions. The role requires proficiency in SQL, Python, and data visualization tools like Tableau or PowerBI. You will collaborate with different departments to identify trends, measure performance, and recommend strategies for growth.",
                notes: "Give a developer test"

            },
        ],
    },
    "closed": {
        id: "closed",
        title: "Closed",
        jobOffers: [],
    },
};


export default function JobOffers() {
    const [columns, setColumns] = useState(initialData);
    const [filteredColumns, setFilteredColumns] = useState(initialData);
    const [selectedDepartment, setSelectedDepartment] = useState("All");

    const departments = ["All", ...Object.values(initialData).flatMap(column => column.jobOffers.map(offer => offer.department)).filter((dept, index, self) => self.indexOf(dept) === index)];

    useEffect(() => {
        if (selectedDepartment === "All") {
            setFilteredColumns(columns);
        } else {
            const filtered = Object.entries(columns).reduce((acc, [key, column]) => {
                acc[key] = {
                    ...column,
                    jobOffers: column.jobOffers.filter(offer => offer.department === selectedDepartment)
                };
                return acc;
            }, {} as typeof columns);
            setFilteredColumns(filtered);
        }
    }, [selectedDepartment, columns]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const startColumn = columns[source.droppableId];
        const finishColumn = columns[destination.droppableId];

        if (startColumn === finishColumn) {
            const newJobOffers = Array.from(startColumn.jobOffers);
            const [movedJob] = newJobOffers.splice(source.index, 1);
            newJobOffers.splice(destination.index, 0, movedJob);

            setColumns(prev => ({
                ...prev,
                [startColumn.id]: {
                    ...startColumn,
                    jobOffers: newJobOffers,
                },
            }));
        } else {
            const startJobOffers = Array.from(startColumn.jobOffers);
            const [movedJob] = startJobOffers.splice(source.index, 1);
            const newStartColumn = {
                ...startColumn,
                jobOffers: startJobOffers,
            };

            const finishJobOffers = Array.from(finishColumn.jobOffers);
            finishJobOffers.splice(destination.index, 0, movedJob);
            const newFinishColumn = {
                ...finishColumn,
                jobOffers: finishJobOffers,
            };

            setColumns(prev => ({
                ...prev,
                [newStartColumn.id]: newStartColumn,
                [newFinishColumn.id]: newFinishColumn,
            }));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Job Offers</h1>
                <div className="flex items-center space-x-4">
                    <Select onValueChange={(value) => setSelectedDepartment(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Link href={`${window.location.pathname}/add`}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Job Offer
                        </Button>
                    </Link>

                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.values(filteredColumns).map((column) => (
                        <div key={column.id} className="bg-background p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`space-y-4 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
                                    >
                                        {column.jobOffers.map((jobOffer, index) => (
                                            <Draggable
                                                key={jobOffer.id}
                                                draggableId={jobOffer.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <Sheet>
                                                        <SheetTrigger className="w-full">
                                                            <Card
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="bg-card"
                                                            >
                                                                <CardHeader className="flex justify-between items-start">
                                                                    <div className="flex items-center justify-between w-full">
                                                                        <CardTitle className="text-blue-500 font-semibold">{jobOffer.title}</CardTitle>
                                                                        <Badge className="bg-gray-200 text-gray-700">{jobOffer.department}</Badge>
                                                                    </div>
                                                                    <div className="text-sm mb-2">
                                                                        <strong>Manager:</strong> {jobOffer.manager}
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent className="">
                                                                    <div className="text-lg font-bold text-gray-800">
                                                                        {jobOffer.applications} Applications
                                                                    </div>
                                                                    <div className="flex justify-between text-sm mt-6">
                                                                        <span className="text-gray-600 flex items-center">
                                                                            <strong><MapPin size={20} className="mr-1" /></strong> {jobOffer.location}
                                                                        </span>
                                                                        <span className="text-gray-600">
                                                                            {jobOffer.datePosted}
                                                                        </span>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </SheetTrigger>
                                                        <SheetContent className="w-full bg-white sm:max-w-2xl overflow-y-auto">
                                                            <SheetHeader className="mb-6">
                                                                <SheetTitle className="text-2xl text-blue-500 font-bold">{jobOffer.title}</SheetTitle>
                                                                <SheetDescription className="flex items-center">
                                                                    <div className="flex items-center space-x-2">
                                                                        <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                                                                        <span>{jobOffer.location}</span>
                                                                    </div>
                                                                    <Badge variant="secondary" className="ml-4">{jobOffer.department}</Badge>
                                                                </SheetDescription>
                                                            </SheetHeader>

                                                            <div className="space-y-2">
                                                                <h3 className="text-lg font-semibold">Details of Position</h3>
                                                            </div>

                                                            <div className="space-y-6 mt-2">
                                                                <Separator />
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <UserIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Recruiter</span>
                                                                        </div>
                                                                        <p>{jobOffer.recruiter}</p>
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Manager</span>
                                                                        </div>
                                                                        <p>{jobOffer.manager}</p>
                                                                    </div>
                                                                </div>

                                                                <Separator />

                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Posted</span>
                                                                        </div>
                                                                        <p>{jobOffer.datePosted}</p>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <ClockIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Deadline</span>
                                                                        </div>
                                                                        <p>{jobOffer.limitDate}</p>
                                                                    </div>
                                                                </div>

                                                                <Separator />

                                                                <div className="space-y-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <DollarSignIcon className="w-5 h-5 text-muted-foreground" />
                                                                        <span className="font-medium">Annual Salary</span>
                                                                    </div>
                                                                    <p className="text-lg font-semibold">{jobOffer.salary}</p>
                                                                </div>


                                                                <Separator />

                                                                <div className="space-y-2">
                                                                    <h3 className="text-lg font-semibold">Job Description</h3>
                                                                    <p className="text-muted-foreground whitespace-pre-line">{jobOffer.description}</p>
                                                                </div>

                                                                <Separator />

                                                                <div>
                                                                    <div className="space-y-2">
                                                                        <h3 className="text-lg font-semibold">Notes</h3>
                                                                        <p className="text-muted-foreground whitespace-pre-line">{jobOffer.notes}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SheetContent>

                                                    </Sheet>

                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
