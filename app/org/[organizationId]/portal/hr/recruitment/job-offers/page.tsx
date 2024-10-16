import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const jobOffers = [
  { id: 1, title: "Senior React Developer", department: "Engineering", location: "Remote", postedDate: "2023-04-01" },
  { id: 2, title: "Product Manager", department: "Product", location: "New York", postedDate: "2023-04-03" },
  { id: 3, title: "UX Designer", department: "Design", location: "San Francisco", postedDate: "2023-04-05" },
  { id: 4, title: "Data Scientist", department: "Data", location: "Boston", postedDate: "2023-04-07" },
];

export default function JobOffers() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Briefcase className="mr-2" />
          Job Offers
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Job Offer
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Posted Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobOffers.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.postedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}