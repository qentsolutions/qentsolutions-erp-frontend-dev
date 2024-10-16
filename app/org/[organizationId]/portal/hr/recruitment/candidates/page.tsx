import { Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const candidates = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer", experience: "5 years", skills: ["React", "TypeScript", "CSS"] },
  { id: 2, name: "Bob Smith", role: "Backend Developer", experience: "7 years", skills: ["Node.js", "Python", "MongoDB"] },
  { id: 3, name: "Carol Williams", role: "UX Designer", experience: "4 years", skills: ["Figma", "Adobe XD", "User Research"] },
  { id: 4, name: "David Brown", role: "Data Analyst", experience: "3 years", skills: ["SQL", "Python", "Tableau"] },
];

export default function Candidates() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Users className="mr-2" />
          Candidates
        </h1>
        <div className="flex items-center">
          <Input className="mr-2" placeholder="Search candidates..." />
          <Button>
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?u=${candidate.id}`} alt={candidate.name} />
                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{candidate.name}</CardTitle>
                <CardDescription>{candidate.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Experience:</strong> {candidate.experience}</p>
              <p><strong>Skills:</strong></p>
              <div className="flex flex-wrap gap-2 mt-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}