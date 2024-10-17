import React, { useState, useEffect } from "react";
import { BarList } from "@tremor/react";

interface Lead {
  id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

// Function to generate mock lead data
const generateMockLeads = (numLeads: number): Lead[] => {
  const statuses = [
    "New",
    "Contacted",
    "Awaiting Response",
    "Interest Expressed",
    "Qualification In Progress",
    "Qualified",
    "Proposal Sent",
    "Negotiation In Progress",
    "Ready to Close",
    "Closed",
  ];

  const leads: Lead[] = [];

  for (let i = 0; i < numLeads; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomDate = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(); // Random date in the last 30 days

    leads.push({
      id: `lead-${i}`,
      userId: `user-${Math.floor(Math.random() * 10)}`, // Random user ID
      name: `Lead ${i + 1}`,
      email: `lead${i + 1}@example.com`,
      phoneNumber: `+1234567890${i}`,
      status: randomStatus,
      note: `This is a note for lead ${i + 1}`,
      createdAt: randomDate,
      updatedAt: randomDate,
    });
  }

  return leads;
};

const LeadStatusAnalytics: React.FC = () => {
  const [leadData, setLeadData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    // Generate mock leads instead of fetching
    const mockLeads = generateMockLeads(100); // Generate 100 leads

    const allStatus = [
      "New",
      "Contacted",
      "Awaiting Response",
      "Interest Expressed",
      "Qualification In Progress",
      "Qualified",
      "Proposal Sent",
      "Negotiation In Progress",
      "Ready to Close",
      "Closed",
    ];

    const leadCountMap: { [status: string]: number } = {};
    allStatus.forEach((status) => {
      leadCountMap[status] = 0;
    });

    mockLeads.forEach((lead) => {
      leadCountMap[lead.status] = (leadCountMap[lead.status] || 0) + 1;
    });

    const leadCounts = allStatus.map((status) => ({
      name: status,
      value: leadCountMap[status],
    }));

    setLeadData(leadCounts);
  }, []);

  return (
    <div className="mx-auto">
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>Status</span>
        <span>Leads</span>
      </p>
      <BarList data={leadData} className="mt-2" />
    </div>
  );
};

export default LeadStatusAnalytics;
