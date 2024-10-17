import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Clock, Download, Globe, MapPin, Paperclip, ReceiptText } from "lucide-react";
import OrganizationalChart from "./organizationalChart";


export default function ProfessionalInfo() {
    return (
        <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue="Engineering">
                        <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="manager">Manager</Label>
                    <Select defaultValue="William Quesnot">
                        <SelectTrigger>
                            <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="John Doe">John Doe</SelectItem>
                            <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Work Details</Label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <Select defaultValue="Remote">
                            <SelectTrigger>
                                <SelectValue placeholder="Work location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Office">Office</SelectItem>
                                <SelectItem value="Remote">Remote</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <Select defaultValue="35 hours">
                            <SelectTrigger>
                                <SelectValue placeholder="Work hours" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="35">35 hours</SelectItem>
                                <SelectItem value="40">40 hours</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <Select defaultValue="Paris UTC+1">
                    <SelectTrigger>
                        <SelectValue placeholder="Time zone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="UTC+1">Paris UTC+1</SelectItem>
                        <SelectItem value="UTC+0">London UTC+0</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Contract</Label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center flex-col  space-y-4">
                        <div className="flex items-center w-full">
                            <ReceiptText className="mr-2 w-5 h-5 text-muted-foreground" />
                            <Select defaultValue="Type of contract">
                                <SelectTrigger>
                                    <SelectValue placeholder="Type of contract" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full time">Full time</SelectItem>
                                    <SelectItem value="Part time">Part time</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center w-full">
                            <CalendarDays className="mr-2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="date"
                                id="entry-date"
                                value="12"
                                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                            />
                        </div>

                        <div className="flex items-center w-full">
                            <Paperclip className="mr-2 w-5 h-5 text-muted-foreground" />

                            <label htmlFor="file-upload" className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                            >
                                {"Attach the contract"}
                                <button className="shadow-sm px-2 border border-gray-100 rounded-lg">
                                    <span className="ml-2 text-muted-foreground flex items-center text-sm"><Download />Upload</span>
                                </button>
                            </label>
                        </div>
                    </div>
                    <div className="relative flex w-full items-center overflow-y-auto h-72 justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                        <div className="absolute z-50 top-2 left-2 text-md font-semibold">
                            Organizational chart
                        </div>
                        <OrganizationalChart centerOnEmployee="Eva" />
                    </div>

                </div>
            </div>
        </div>
    )
}