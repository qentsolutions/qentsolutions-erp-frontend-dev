"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { BadgeIcon, BriefcaseIcon, CalendarIcon, ClockIcon, DollarSignIcon, MailIcon, MapPin, PhoneIcon, Plus, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Define the candidate type
type Candidate = {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    status: "in progress" | "planned";
    dateOfApplication: string;
    stars: number;
    jobID: string; // related to job offer
    statusHistory: string[]; // history of statuses
    comments: string[]; // candidate comments
};

// Define the column type
type Column = {
    id: string;
    title: string;
    candidates: Candidate[];
};

// Initial data for job applications
const initialData: { [key: string]: Column } = {
    "initial-qualification": {
        id: "initial-qualification",
        title: "Initial Qualification",
        candidates: [
            {
                id: "1",
                name: "Alice Johnson",
                phoneNumber: "123-456-7890",
                email: "alice.johnson@example.com",
                status: "in progress",
                dateOfApplication: "2024-10-01",
                stars: 5,
                jobID: "job_001",
                statusHistory: ["Applied", "Interview Scheduled", "In Progress"],
                comments: ["Great fit for the role", "Need to check references"],
            },
            {
                id: "2",
                name: "Bob Smith",
                phoneNumber: "987-654-3210",
                email: "bob.smith@example.com",
                status: "planned",
                dateOfApplication: "2024-10-02",
                stars: 4,
                jobID: "job_002",
                statusHistory: ["Applied", "Initial Screening"],
                comments: ["Good communication skills"],
            },
        ],
    },
    "phone-interview": {
        id: "phone-interview",
        title: "Phone Interview",
        candidates: [
            {
                id: "3",
                name: "Charlie Brown",
                phoneNumber: "555-555-5555",
                email: "charlie.brown@example.com",
                status: "in progress",
                dateOfApplication: "2024-10-03",
                stars: 3,
                jobID: "job_003",
                statusHistory: ["Applied", "Phone Interview Scheduled"],
                comments: ["Needs improvement on technical skills"],
            },
        ],
    },
    "interview": {
        id: "interview",
        title: "Interview",
        candidates: [
            {
                id: "4",
                name: "Diana Prince",
                phoneNumber: "555-123-4567",
                email: "diana.prince@example.com",
                status: "planned",
                dateOfApplication: "2024-10-04",
                stars: 4,
                jobID: "job_004",
                statusHistory: ["Applied", "Interview Scheduled"],
                comments: ["Excellent team player"],
            },
        ],
    },
    "decision": {
        id: "decision",
        title: "Decision",
        candidates: [],
    },
};

export default function JobApplications() {
    const [columns, setColumns] = useState(initialData);
    const [filteredColumns, setFilteredColumns] = useState(initialData);
    const [selectedDepartment, setSelectedDepartment] = useState("All");

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
            const newCandidates = Array.from(startColumn.candidates);
            const [movedCandidate] = newCandidates.splice(source.index, 1);
            newCandidates.splice(destination.index, 0, movedCandidate);

            setColumns(prev => ({
                ...prev,
                [startColumn.id]: {
                    ...startColumn,
                    candidates: newCandidates,
                },
            }));
        } else {
            const startCandidates = Array.from(startColumn.candidates);
            const [movedCandidate] = startCandidates.splice(source.index, 1);
            const newStartColumn = {
                ...startColumn,
                candidates: startCandidates,
            };

            const finishCandidates = Array.from(finishColumn.candidates);
            finishCandidates.splice(destination.index, 0, movedCandidate);
            const newFinishColumn = {
                ...finishColumn,
                candidates: finishCandidates,
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
                <h1 className="text-3xl font-bold">Job Applications</h1>
                <div className="flex items-center space-x-4">
                    <Link href={`${window.location.pathname}/add`}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Application
                        </Button>
                    </Link>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.values(filteredColumns).map((column) => (
                        <div key={column.id} className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`space-y-4 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-blue-100 rounded-lg' : ''}`}
                                    >
                                        {column.candidates.map((candidate, index) => (
                                            <Draggable
                                                key={candidate.id}
                                                draggableId={candidate.id}
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
                                                                        <CardTitle className="text-blue-500 font-semibold">{candidate.name}</CardTitle>
                                                                        <Badge className="bg-gray-200 text-gray-700 text-xs">{candidate.status}</Badge>
                                                                    </div>
                                                                    <span className="text-gray-600 text-sm flex items-center">
                                                                        <PhoneIcon size={14} className="mr-1" />{candidate.phoneNumber}
                                                                    </span>
                                                                    <span className="text-gray-600 text-sm">
                                                                        {candidate.email}
                                                                    </span>
                                                                </CardHeader>
                                                                <CardContent className="flex-none">
                                                                    <div className="flex justify-between text-sm">

                                                                        <span className="text-gray-600">
                                                                            Date: {candidate.dateOfApplication}
                                                                        </span>
                                                                    </div>

                                                                    <div className="flex justify-between text-sm mt-2">
                                                                        <span className="text-gray-600">
                                                                            <strong>Stars:</strong> {candidate.stars}
                                                                        </span>
                                                                        <span className="text-gray-600">
                                                                            <Link href={`/job/${candidate.jobID}`} className="text-blue-600 underline">{candidate.jobID}</Link>
                                                                        </span>
                                                                    </div>
                                                                </CardContent>

                                                            </Card>
                                                        </SheetTrigger>
                                                        <SheetContent className="w-full bg-white sm:max-w-2xl overflow-y-auto">
                                                            <SheetHeader className="mb-6">
                                                                <SheetTitle className="text-2xl text-blue-500 font-bold">{candidate.name}</SheetTitle>
                                                                <SheetDescription className="flex items-center">
                                                                    <div className="flex items-center space-x-2">
                                                                        <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                                                                        <span>{candidate.phoneNumber}</span>
                                                                    </div>
                                                                    <Badge variant="secondary" className="ml-4">{candidate.stars} Stars</Badge>
                                                                </SheetDescription>
                                                            </SheetHeader>

                                                            <div className="space-y-2">
                                                                <h3 className="text-lg font-semibold">Candidate Details</h3>
                                                            </div>

                                                            <div className="space-y-6 mt-2">
                                                                <Separator />
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <MailIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Email</span>
                                                                        </div>
                                                                        <p>{candidate.email}</p>
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <UserIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Status</span>
                                                                        </div>
                                                                        <p>{candidate.status}</p>
                                                                    </div>
                                                                </div>

                                                                <Separator />

                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Date of Application</span>
                                                                        </div>
                                                                        <p>{candidate.dateOfApplication}</p>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <BadgeIcon className="w-5 h-5 text-muted-foreground" />
                                                                            <span className="font-medium">Job Offer ID</span>
                                                                        </div>
                                                                        <p>{candidate.jobID}</p>
                                                                    </div>
                                                                </div>

                                                                <Separator />

                                                                <div className="space-y-2">
                                                                    <h3 className="text-lg font-semibold">Status History</h3>
                                                                    <ul className="list-disc list-inside text-muted-foreground">
                                                                        {candidate.statusHistory.map((status, index) => (
                                                                            <li key={index}>{status}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>

                                                                <Separator />

                                                                <div className="space-y-2">
                                                                    <h3 className="text-lg font-semibold">Comments</h3>
                                                                    <ul className="list-disc list-inside text-muted-foreground">
                                                                        {candidate.comments.map((comment, index) => (
                                                                            <li key={index}>{comment}</li>
                                                                        ))}
                                                                    </ul>
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
