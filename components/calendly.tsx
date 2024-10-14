"use client"

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from './ui/use-toast';

export default function Calendly() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  const availableTimes = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const handleBooking = () => {
    if (date && selectedTime) {
      // Here you would typically send this data to your backend
      console.log('Booking:', { date, time: selectedTime });
      toast({
        title: "Appointment Booked!",
        description: `Your appointment is scheduled for ${date.toDateString()} at ${selectedTime}.`,
      });
      // Reset selection
      setSelectedTime(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Book an Appointment</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Select a Date</CardTitle>
            <CardDescription>Choose your preferred date for the appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Select a Time</CardTitle>
            <CardDescription>Available time slots for {date?.toDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleBooking}
              disabled={!date || !selectedTime}
            >
              Book Appointment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}