import { Label } from "@/components/ui/label";
import { Download, Paperclip } from "lucide-react";


export default function PersonalInfo() {
    return (
        <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Postal Address */}
                <div>
                    <Label htmlFor="postal-address">Postal Address</Label>
                    <input
                        type="text"
                        id="postal-address"
                        placeholder="Enter postal address"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email-address">Email Address</Label>
                    <input
                        type="email"
                        id="email-address"
                        placeholder="Enter email address"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <input
                        type="tel"
                        id="phone-number"
                        placeholder="Enter phone number"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {/* Date of Birth */}
                <div>
                    <Label htmlFor="date-of-birth">Date of Birth</Label>
                    <input
                        type="date"
                        id="date-of-birth"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Place of Birth */}
                <div>
                    <Label htmlFor="place-of-birth">Place of Birth</Label>
                    <input
                        type="text"
                        id="place-of-birth"
                        placeholder="Enter place of birth"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {/* Education */}
                <div>
                    <Label htmlFor="education">Education</Label>
                    <input
                        type="text"
                        id="education"
                        placeholder="Enter education level"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Family Situation */}
                <div>
                    <Label htmlFor="family-situation">Family Situation</Label>
                    <input
                        type="text"
                        id="family-situation"
                        placeholder="Enter family situation"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {/* Number of Children */}
                <div>
                    <Label htmlFor="children">Number of Children to Charge</Label>
                    <input
                        type="number"
                        id="children"
                        placeholder="Enter number of children"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Emergency Contact */}
                <div>
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <input
                        type="text"
                        id="emergency-contact"
                        placeholder="Enter emergency contact"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {/* Emergency Contact Phone Number */}
                <div>
                    <Label htmlFor="emergency-contact-phone">Emergency Contact Phone Number</Label>
                    <input
                        type="tel"
                        id="emergency-contact-phone"
                        placeholder="Enter emergency contact phone number"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Nationality */}
                <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <input
                        type="text"
                        id="nationality"
                        placeholder="Enter nationality"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {/* Visa Type */}
                <div>
                    <Label htmlFor="visa-type">Visa Type</Label>
                    <input
                        type="text"
                        id="visa-type"
                        placeholder="Enter visa type"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Issue Date */}
                <div>
                    <Label htmlFor="issue-date">Issue Date</Label>
                    <input
                        type="date"
                        id="issue-date"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {/* Expiration Date */}
                <div>
                    <Label htmlFor="expiration-date">Expiration Date</Label>
                    <input
                        type="date"
                        id="expiration-date"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            {/* Attachments (Visa Documents) */}
            <div className="flex items-center w-full">
                <Paperclip className="mr-2 w-5 h-5 text-muted-foreground" />
                <label htmlFor="file-upload" className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    {"Attach Visa Documents"}
                    <button className="shadow-sm px-2 border border-gray-100 rounded-lg">
                        <span className="ml-2 text-muted-foreground flex items-center text-sm"><Download />Upload</span>
                    </button>
                </label>
            </div>
        </div>
    )
}