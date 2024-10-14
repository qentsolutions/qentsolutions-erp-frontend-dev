"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Candidates() {
  const [candidates, setCandidates] = useState([
    {
      candidate_id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone_number: "555-1234",
      resume: "Resume_JD.pdf",
      cover_letter: "Motivated and ready to contribute to your team.",
      date_applied: "2024-09-10",
    },
    {
      candidate_id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone_number: "555-5678",
      resume: "Resume_JS.pdf",
      cover_letter: "Excited for this opportunity and eager to start.",
      date_applied: "2024-10-02",
    },
    // Additional candidates can be added here
  ]);

  const { toast } = useToast();

  const handleAddCandidate = (e: any) => {
    e.preventDefault();
    // Logic to add a new candidate
    toast({
      title: "Candidate Added",
      description: "The candidate has been added successfully.",
    });
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Candidates Management</h1>

      {/* Button to add a new candidate */}
      <Sheet>
        <SheetTrigger>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 rounded-lg shadow-lg py-2 px-4">
            + Add Candidate
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Add New Candidate</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCandidate} className="space-y-4">
                <Input placeholder="First Name" required />
                <Input placeholder="Last Name" required />
                <Input placeholder="Email" required />
                <Input placeholder="Phone Number" required />
                <Textarea placeholder="Resume Link" required />
                <Textarea placeholder="Cover Letter" required />
                <Input type="date" placeholder="Date Applied" required />
                <Button type="submit" className="w-full">
                  Add Candidate
                </Button>
              </form>
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>

      {/* Display all candidates */}
      <Card>
        <CardHeader>
          <CardTitle>Current Candidates</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div
                key={candidate.candidate_id}
                className="border border-gray-300 p-4 rounded-md shadow-md bg-white transition transform hover:scale-105 duration-300"
              >
                <h2 className="text-xl font-semibold">{candidate.first_name} {candidate.last_name}</h2>
                <p className="text-gray-600"><strong>Email:</strong> {candidate.email}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {candidate.phone_number}</p>
                <p className="text-gray-500"><strong>Resume:</strong> {candidate.resume}</p>
                <p className="text-gray-500"><strong>Cover Letter:</strong> {candidate.cover_letter}</p>
                <p className="text-gray-500"><strong>Date Applied:</strong> {candidate.date_applied}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No candidates available at the moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
