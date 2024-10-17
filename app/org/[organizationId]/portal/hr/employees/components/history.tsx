import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";


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
        { date: "2023-05-15", event: "Applied for Senior Developer position", "editer": "William Quesnot" },
        { date: "2023-05-20", event: "Resume screened and approved", "editer": "William Quesnot"  },
        { date: "2023-05-25", event: "First interview scheduled", "editer": "William Quesnot"  },
        { date: "2023-06-01", event: "First interview completed - Positive feedback", "editer": "William Quesnot"  },
        { date: "2023-06-10", event: "Second interview scheduled", "editer": "William Quesnot"  },
        { date: "2023-06-15", event: "Second interview completed - Highly recommended", "editer": "William Quesnot"  },
        { date: "2023-06-20", event: "Offer sent" },
    ]
};

const candidate = mockCandidate;


export default function HistoryEmployee() {
    return (
        <div className="w-full">
            <Card className="h-full border-none shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Clock className="mr-2" />
                        Employee History
                    </CardTitle>
                </CardHeader>
                <CardContent className="overflow-y-auto h-[calc(60vh-4rem)]">
                    <ul className="space-y-4">
                        {candidate.history.map((event, index) => (
                            <li key={index} className="border-l-2 border-primary pl-4 pb-4">
                                <div className="flex flex-col">
                                    <span className="text-sm">{event.editer}</span>
                                    <span className="text-sm text-muted-foreground">{event.date}</span>
                                    <span className="font-medium">{event.event}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}