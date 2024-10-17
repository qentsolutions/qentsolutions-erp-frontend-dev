"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { User, Mail, Phone, Calendar, FileText, Paperclip, Edit, Clock, ArrowLeftToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Mock data for a candidate
const mockCandidate = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    resumeUrl: "/path/to/resume.pdf",
    coverLetterUrl: "/path/to/cover-letter.pdf",
    dateApplied: "2023-05-15",
    notes: "Strong candidate with excellent communication skills. Follow up required regarding project experience.",
    history: [
        { date: "2023-05-15", event: "Applied for Senior Developer position" },
        { date: "2023-05-20", event: "Resume screened and approved" },
        { date: "2023-05-25", event: "First interview scheduled" },
        { date: "2023-06-01", event: "First interview completed - Positive feedback" },
        { date: "2023-06-10", event: "Second interview scheduled" },
        { date: "2023-06-15", event: "Second interview completed - Highly recommended" },
        { date: "2023-06-20", event: "Offer sent" },
    ]
};

export default function CandidateInfo() {
    const params = useParams();
    const candidateId = params.id;

    // In a real application, you would fetch the candidate data based on the ID
    const candidate = mockCandidate;

    const [notes, setNotes] = useState(candidate.notes);

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    };

    const handleSaveNotes = () => {
        // Here you would typically save the notes to your backend
        console.log("Saving notes:", notes);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center">
                <button onClick={() => { window.history.back(); }} className="mb-4 mr-4 text-blue-500 hover:text-blue-700">
                    <ArrowLeftToLine />
                </button>
                <h1 className="text-3xl font-bold mb-6">Candidate Information</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p><strong>First Name:</strong> {candidate.firstName}</p>
                                <p><strong>Last Name:</strong> {candidate.lastName}</p>
                                <p className="flex items-center">
                                    <Mail className="mr-2" />
                                    <a href={`mailto:${candidate.email}`} className="text-blue-500 hover:underline">{candidate.email}</a>
                                </p>
                                <p className="flex items-center">
                                    <Phone className="mr-2" />
                                    {candidate.phoneNumber}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="mr-2" />
                                Application Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><strong>Date Applied:</strong> {candidate.dateApplied}</p>
                            <div className="mt-4 space-y-2">
                                <Button className="w-full flex justify-between items-center">
                                    <FileText className="mr-2" />
                                    View Resume
                                    <Paperclip className="ml-2" />
                                </Button>
                                <Button className="w-full flex justify-between items-center">
                                    <FileText className="mr-2" />
                                    View Cover Letter
                                    <Paperclip className="ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Edit className="mr-2" />
                                    Notes
                                </div>
                                <Button onClick={handleSaveNotes}>Save Notes</Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={notes}
                                onChange={handleNotesChange}
                                placeholder="Add notes about the candidate here..."
                                className="min-h-[200px]"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full lg:w-1/3">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Clock className="mr-2" />
                                Candidate History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {candidate.history.map((event, index) => (
                                    <li key={index} className="border-l-2 border-primary pl-4 pb-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">{event.date}</span>
                                            <span className="font-medium">{event.event}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}