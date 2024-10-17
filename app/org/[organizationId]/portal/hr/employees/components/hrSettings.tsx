import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CalendarDays, CalendarIcon, Clock, Download, Globe, MapPin, Paperclip, ReceiptText } from "lucide-react";

export default function HrSettings() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
                <Label htmlFor="employeeType">Employee Type</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select employee type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="linkUser">Link User</Label>
                <input
                    type="text"
                    id="linkUser"
                    placeholder="Enter linked user"
                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div>
                <Label htmlFor="annualSalary">Annual Gross Salary</Label>
                <input
                    type="number"
                    id="annualSalary"
                    placeholder="Enter annual gross salary"
                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div>
                <Label htmlFor="monthlySalary">Monthly Salary</Label>
                <input
                    type="number"
                    id="monthlySalary"
                    placeholder="Enter monthly salary"
                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div>
                <Label htmlFor="monthlySchedule">Monthly Schedule</Label>
                <input
                    type="text"
                    id="monthlySchedule"
                    placeholder="Enter monthly schedule"
                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div>
                <Label htmlFor="hourlyCost">Hourly Cost</Label>
                <input
                    type="number"
                    id="hourlyCost"
                    placeholder="Enter hourly cost"
                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div>
                <Label htmlFor="mutuelle">Mutuelle</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Yes or No" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                </Select>
                <input
                    type="text"
                    id="mutuelleReason"
                    placeholder="If No, reason"
                    className="mt-2 flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div>
                <Label htmlFor="trialPeriodEnd">Trial Period (End Date)</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Pick a date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar />
                    </PopoverContent>
                </Popover>
            </div>

            <div>
                <Label htmlFor="leaveValidator">Leave Validator</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select leave validator" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="expenseReportValidator">Expense Report Validator</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select expense report validator" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="col-span-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="flex items-center space-x-2">
                    <Paperclip className="w-5 h-5 text-muted-foreground" />
                    <label
                        htmlFor="file-upload"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {"Attach document"}
                        <button className="shadow-sm px-2 border border-gray-100 rounded-lg">
                            <span className="ml-2 text-muted-foreground flex items-center text-sm">
                                <Download />Upload
                            </span>
                        </button>
                    </label>
                </div>
            </div>
        </div>
    )
}