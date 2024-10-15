"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function JobOffers() {
    const [offers, setOffers] = useState([
        {
            id: 1,
            title: "Web Developer",
            description: "Looking for a web developer with a good knowledge of React and Node.js.",
            skills: "React, Node.js, CSS",
            experience: "Junior",
            location: "Paris",
            contractType: "CDI",
            salary: "40,000€",
        },
    ]);
    const { toast } = useToast();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Logic to create a new job offer
        toast({
            title: "Offer Created",
            description: "The job offer has been created successfully.",
        });
    };

    return (
        <div className="space-y-6 p-4">
            <h1 className="text-3xl font-bold text-gray-800">Job Offer Management</h1>
            <Sheet>
                <SheetTrigger>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 rounded-lg shadow-lg py-2 px-4">
                        + Job Offers
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-white w-1/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create a New Offer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input placeholder="Job Title" required />
                                <Textarea placeholder="Job Description" required />
                                <Input placeholder="Required Skills" required />
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Experience Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="junior">Junior</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="senior">Senior</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input placeholder="Location" required />
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Contract Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cdi">CDI</SelectItem>
                                        <SelectItem value="cdd">CDD</SelectItem>
                                        <SelectItem value="temporary">Temporary</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input placeholder="Salary" required />
                                <Button type="submit" className="w-full">Create Offer</Button>
                            </form>
                        </CardContent>
                    </Card>
                </SheetContent>
            </Sheet>

            <Card>
                <CardHeader>
                    <CardTitle>Current Offers</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {offers.length > 0 ? (
                        offers.map(offer => (
                            <div key={offer.id} className="border border-gray-300 p-4 rounded-md shadow-md bg-white transition transform hover:scale-105 duration-300">
                                <h2 className="text-xl font-semibold">{offer.title}</h2>
                                <p className="text-gray-600">{offer.description}</p>
                                <p className="text-gray-500"><strong>Skills:</strong> {offer.skills}</p>
                                <p className="text-gray-500"><strong>Experience Level:</strong> {offer.experience}</p>
                                <p className="text-gray-500"><strong>Location:</strong> {offer.location}</p>
                                <p className="text-gray-500"><strong>Contract Type:</strong> {offer.contractType}</p>
                                <p className="text-gray-500"><strong>Salary:</strong> {offer.salary}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No offers available at the moment.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
