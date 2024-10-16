import { FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const applications = [
  { id: 1, name: "John Doe", position: "Senior React Developer", status: "New", appliedDate: "2023-04-10" },
  { id: 2, name: "Jane Smith", position: "Product Manager", status: "In Review", appliedDate: "2023-04-11" },
  { id: 3, name: "Mike Johnson", position: "UX Designer", status: "Interviewed", appliedDate: "2023-04-12" },
  { id: 4, name: "Sarah Brown", position: "Data Scientist", status: "Rejected", appliedDate: "2023-04-13" },
];

export default function JobApplications() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileText className="mr-2" />
        Job Applications
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.name}</TableCell>
              <TableCell>{app.position}</TableCell>
              <TableCell>
                <Badge variant={app.status === "Rejected" ? "destructive" : "default"}>
                  {app.status}
                </Badge>
              </TableCell>
              <TableCell>{app.appliedDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" /> View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}